import { configureStore } from '@reduxjs/toolkit';
import userState from '../redux_states/userState';
import questState from '../redux_states/questState';
export default configureStore({
  reducer: {
    user: userState,
    quest: questState,
    // other reducers...
  },
});
