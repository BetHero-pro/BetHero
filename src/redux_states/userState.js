import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: 'guest user',
    avatarurl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  reducers: {
    setUserData: (state, action) => {
      const { username, avatarurl } = action.payload;
      state.username = username;
      state.avatarurl = avatarurl;
    },
    getUserData: state => {
      return state;
    },
  },
});

export const { setUserData, getUserData } = userSlice.actions;
export default userSlice.reducer;
