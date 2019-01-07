import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers'
import thunk from 'redux-thunk';
import { routerMiddleware, push } from 'react-router-redux'
import { history } from '../index';

const routingMiddleware = routerMiddleware(history)
const middlewares = [thunk, routingMiddleware]
export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );
}