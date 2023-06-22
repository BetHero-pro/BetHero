import { configureStore } from '@reduxjs/toolkit';
import userState from '../redux_states/userState';

export default configureStore({
  reducer: {
    user: userState,
    // other reducers...
  },
});
