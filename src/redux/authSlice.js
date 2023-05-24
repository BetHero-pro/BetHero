import { createSlice } from "@reduxjs/toolkit";
import oauth from "discord-oauth2";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    authenticating: false,
    user: {
      username: "",
    },
  },
  reducers: {
    getUsername: (state, token) => {
      state.user.username = oauth.getUser(token);
    },
    user_is_authenticating: (state) => {
      state.authenticating = true;
      state.authenticated = false;
    },
    user_is_authenticated: (state) => {
      state.authenticated = true;
      state.authenticating = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUsername, user_is_authenticating, user_is_authenticated } =
  authSlice.actions;

export default authSlice.reducer;
