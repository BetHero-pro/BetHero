import { configureStore } from '@reduxjs/toolkit';
import userState from '../redux_states/userState';
import questState from '../redux_states/questState';

import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const middleware = [thunk];
export default configureStore(
  {
    reducer: {
      user: userState,
      quest: questState,
      // other reducers...
    },
  },
  compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);
