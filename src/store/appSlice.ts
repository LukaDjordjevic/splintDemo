import {createSlice} from '@reduxjs/toolkit';

import {RootState} from './Store';
import {apiKey} from '../constants';

interface AppSliceType {
  apiKey: String;
  toastMessage: String;
}

const initialState: AppSliceType = {
  apiKey,
  toastMessage: '',
};

const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToastMessage(state, action) {
      state.toastMessage = action.payload;
    },
    setApiKey(state, action) {
      state.apiKey = action.payload;
    },
  },
});

export const {setToastMessage, setApiKey} = AppSlice.actions;

//Selectors
export const selectApiKey = (state: RootState) => state.app.apiKey;
export const selectToastMessage = (state: RootState) => state.app.toastMessage;

export default AppSlice.reducer;
