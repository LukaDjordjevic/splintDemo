import {configureStore, combineReducers} from '@reduxjs/toolkit';
import stockDetailsReducer from './stockDetailsSlice';
import homeReducer from './homeSlice';
import appReducer from './appSlice';

const rootReducer = combineReducers({
  app: appReducer,
  home: homeReducer,
  stockDetails: stockDetailsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
