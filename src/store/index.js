import {combineReducers, createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from './auth';
import userReducer from './user';
import guildsReducer from './guilds';
const middleware = [];

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    guildsReducer
})

export const configureStore = () => {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, ...middleware)));
  return store;
}