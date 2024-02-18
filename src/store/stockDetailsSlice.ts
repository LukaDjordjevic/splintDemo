import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {apiKey, toastMessages} from '../constants';

import {RootState} from './Store';
import {convertApiDataToGraphFormat} from '../util/data';
import {setToastMessage} from './appSlice';
import {GraphDataPointType} from '../components/DataChart';

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
  async (symbol: String, {dispatch}) => {
    try {
      const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;
      const response = await fetch(url);
      const json = await response.json();
      if (json?.Information?.includes('API key')) {
        dispatch(setToastMessage(toastMessages.API_KEY_REJECTED));
        return Promise.reject('API key rejected');
      }
      return json;
    } catch (error) {
      dispatch(setToastMessage(toastMessages.DEFAULT_NETWORK_ERROR));
      console.log('error: ', error);
    }
  },
);

export const getDailyData = createAsyncThunk(
  'stockDetails/getDailyData',
  async (symbol: String, {dispatch}) => {
    try {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${apiKey}`;
      const response = await fetch(url);
      const json = await response.json();
      if (json?.Information?.includes('API key')) {
        dispatch(setToastMessage(toastMessages.API_KEY_REJECTED));
        return Promise.reject('API key rejected');
      }
      if (!json['Time Series (Daily)']) {
        dispatch(setToastMessage(toastMessages.DEFAULT_NETWORK_ERROR));
        return Promise.reject(toastMessages.DEFAULT_NETWORK_ERROR);
      }
      const dailyData = json['Time Series (Daily)'];
      return convertApiDataToGraphFormat(dailyData);
    } catch (error) {
      dispatch(setToastMessage(toastMessages.DEFAULT_NETWORK_ERROR));
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
      state.companyOverview = null;
    });
    builder.addCase(
      getDailyData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        state.graphData = action.payload;
      },
    );
    builder.addCase(getCompanyOverview.pending, state => {
      state.status = 'loading';
      state.companyOverview = null;
    });
    builder.addCase(getDailyData.rejected, state => {
      state.status = 'failed';
    });
    builder.addCase(
      getCompanyOverview.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        state.companyOverview = action.payload;
      },
    );
    builder.addCase(getCompanyOverview.rejected, state => {
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
