import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {apiKey} from '../constants';

import {RootState} from './Store';

interface StockTimePointValuesType {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}
export interface StockTimeRangeType {
  [key: string]: StockTimePointValuesType;
}
export interface GraphDataPointType {
  x: String;
  y: Number;
}

export interface StockDetailsType {
  status: 'idle' | 'failed' | 'loading';
  dailyRawData: StockTimeRangeType[] | null;
  graphData: GraphDataPointType[] | null;
}

const initialState: StockDetailsType = {
  status: 'idle',
  dailyRawData: null,
  graphData: null,
};

export const getDailyData = createAsyncThunk(
  'stockDetails/getDailyData',
  async (symbol: String) => {
    try {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${apiKey}`;
      const response = await fetch(url);
      const json = await response.json();
      if (json?.Information) {
        console.log('rejecting');
        return Promise.reject('API key rejected');
      }
      const dailyData = json['Time Series (Daily)'];
      return dailyData;
    } catch (error) {
      console.log('error: ', error);
    }
  },
);

const stockDetailsSlice = createSlice({
  name: 'stockDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDailyData.pending, state => {
      state.status = 'loading';
      state.graphData = null;
    });
    builder.addCase(
      getDailyData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        const data = action.payload;

        const dates = Object.keys(data);

        const victoryGraphData = dates.map(date => {
          return {
            x: date,
            y: parseFloat(data[date]['1. open']),
          };
        });

        const graphDataSize = victoryGraphData.length;

        const scaleFactor = Math.floor(graphDataSize / 375); // screen width

        let filteredGraphData;

        if (scaleFactor > 1) {
          filteredGraphData = victoryGraphData
            .filter((dataPoint, index) => index % (scaleFactor * 2) === 0)
            .reverse();
        } else {
          filteredGraphData = victoryGraphData.reverse();
        }

        state.graphData = filteredGraphData;
      },
    );
    builder.addCase(getDailyData.rejected, (state, action) => {
      console.log('FAILED action: ', action);
      state.status = 'failed';
    });
  },
});

export const {} = stockDetailsSlice.actions;

//Selectors
export const selectDaily = (state: RootState) =>
  state.stockDetails.dailyRawData;

export const selectGraphData = (state: RootState) =>
  state.stockDetails.graphData;
export const selectStatus = (state: RootState) => state.stockDetails.status;

export default stockDetailsSlice.reducer;
