import {combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import {ReducerAuth, ReducerProduct, ReducerUsers} from './Reducer/Reducers'
import { apiSlice } from '../api/apiSlice';


export const rootReducer = combineReducers({
  products: ReducerProduct,
  users: ReducerUsers,
  auth: ReducerAuth,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer, 
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
},
);

export type AppStore = typeof store

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']

export default store;
