import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import {thunk} from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

export default store;