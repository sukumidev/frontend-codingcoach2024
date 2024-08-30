// store/index.js
import { createStore, combineReducers } from 'redux';
import {pageReducer} from './pageReducer';

const rootReducer = combineReducers({
  page: pageReducer,
});

const store = createStore(rootReducer);

export default store;
