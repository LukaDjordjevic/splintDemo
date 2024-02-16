import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

import {RootState} from './Store';

export interface StockDetailsType {
  status: 'idle' | 'failed' | 'loading';
}

const initialState: StockDetailsType = {
  status: 'idle',
};

const apiKey = '7IS15LNFJ6M5YW9W';
console.log('apiKey: ', apiKey);

const stockDetailsSlice = createSlice({
  name: 'stockDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = stockDetailsSlice.actions;

//Selectors
// export const selectValue = (state: RootState) => state.stockDetails.zuzu;

export default stockDetailsSlice.reducer;
