import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

import {RootState} from './Store';
import {apiKey} from '../constants';

export interface StockListItemType {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
}

interface HomeSliceType {
  gainers: StockListItemType[] | null;
  losers: StockListItemType[] | null;
  mostActive: StockListItemType[] | null;
  status: 'idle' | 'failed' | 'loading';
}

const initialState: HomeSliceType = {
  gainers: null,
  losers: null,
  mostActive: null,
  status: 'idle',
};

export const getStocksLists = createAsyncThunk(
  'home/getStocksLists',
  async (_, {dispatch, getState}) => {
    try {
      const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`;
      const response = await fetch(url);
      const json = await response.json();
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

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getStocksLists.pending, state => {
      state.status = 'loading';
      state.gainers = null;
      state.losers = null;
      state.mostActive = null;
    });
    builder.addCase(
      getStocksLists.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        state.gainers = action.payload.top_gainers;
        state.losers = action.payload.top_losers;
        state.mostActive = action.payload.most_actively_traded;
      },
    );
    builder.addCase(getStocksLists.rejected, (state, action) => {
      state.status = 'failed';
    });
  },
});

export const {} = HomeSlice.actions;

//Selectors
export const selectGainers = (state: RootState) => state.home.gainers;
export const selectLosers = (state: RootState) => state.home.losers;
export const selectMostActive = (state: RootState) => state.home.mostActive;
export const selectStatus = (state: RootState) => state.home.status;

export default HomeSlice.reducer;
