import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {apiKey} from '../constants';

import {RootState} from './Store';
import {convertApiDataToGraphFormat} from '../util/data';

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

export interface CompanyOverviewType {
  Name?: string;
  Description?: string;
  Address?: string;
  Country?: string;
  Exchange?: string;
  Industry?: string;
  QuarterlyEarningsGrowthYOY?: string;
  QuarterlyRevenueGrowthYOY?: string;
}

export interface StockDetailsSliceType {
  status: 'idle' | 'failed' | 'loading';
  dailyRawData: StockTimeRangeType[] | null;
  graphData: GraphDataPointType[] | null;
  companyOverview: CompanyOverviewType | null;
}

const initialState: StockDetailsSliceType = {
  status: 'idle',
  dailyRawData: null,
  graphData: null,
  companyOverview: null,
};

export const getCompanyOverview = createAsyncThunk(
  'stockDetails/getCompanyOverview',
  async (symbol: String) => {
    try {
      const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=demo`;
      const response = await fetch(url);
      const json = await response.json();
      console.log('overview json: ', json);
      if (json?.Information) {
        console.log('rejecting');
        return Promise.reject('API key rejected');
      }
      return json;
    } catch (error) {
      console.log('error: ', error);
    }
  },
);

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

      return convertApiDataToGraphFormat(dailyData);
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
        state.graphData = action.payload;
      },
    );
    builder.addCase(getDailyData.rejected, (state, action) => {
      console.log('FAILED action: ', action);
      state.status = 'failed';
    });
    builder.addCase(getCompanyOverview.pending, state => {
      state.status = 'loading';
      state.companyOverview = null;
    });
    builder.addCase(
      getCompanyOverview.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        state.companyOverview = action.payload;
      },
    );
    builder.addCase(getCompanyOverview.rejected, (state, action) => {
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
export const selectCompanyOverview = (state: RootState) =>
  state.stockDetails.companyOverview;

export default stockDetailsSlice.reducer;
