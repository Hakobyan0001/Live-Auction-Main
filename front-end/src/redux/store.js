import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

const initialState = {};
const middleware = [
  thunk,
];

// In case of development mode add dev tools extension and redux-logger middleware
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const composedEnhancers = compose(
  applyMiddleware(...middleware)
);

export default createStore(
  rootReducer,
  initialState,
  composedEnhancers,
);
