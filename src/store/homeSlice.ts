import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

import {RootState} from './Store';
import {apiKey, toastMessages} from '../constants';
import {setToastMessage} from './appSlice';

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
  lastUpdated: string | null;
  status: 'idle' | 'failed' | 'loading';
}

const initialState: HomeSliceType = {
  gainers: null,
  losers: null,
  mostActive: null,
  lastUpdated: null,
  status: 'idle',
};

export const getStocksLists = createAsyncThunk(
  'home/getStocksLists',
  async (_, {dispatch}) => {
    try {
      const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`;
      const response = await fetch(url);
      const json = await response.json();
      if (json?.Information?.includes('API key')) {
        dispatch(setToastMessage(toastMessages.API_KEY_REJECTED));
        return Promise.reject('API key rejected');
      }
      if (!json.top_gainers) {
        dispatch(setToastMessage(toastMessages.DEFAULT_NETWORK_ERROR));
        return Promise.reject(toastMessages.DEFAULT_NETWORK_ERROR);
      }
      return json;
    } catch (error) {
      dispatch(setToastMessage(toastMessages.DEFAULT_NETWORK_ERROR));
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
      state.lastUpdated = null;
    });
    builder.addCase(
      getStocksLists.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        state.gainers = action.payload.top_gainers;
        state.losers = action.payload.top_losers;
        state.mostActive = action.payload.most_actively_traded;
        state.lastUpdated = action.payload.last_updated;
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
export const selectLastUpdted = (state: RootState) => state.home.lastUpdated;
export const selectStatus = (state: RootState) => state.home.status;

export default HomeSlice.reducer;
