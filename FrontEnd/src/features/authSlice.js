import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  error: null,
  expirationTime: null, // Store the expiration time
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      const expirationTime = Date.now() + 60 * 60 * 1000; // Set expiration time (1 hour from now)

      state.isLoggedIn = true;
      state.user = user;
      state.token = token;
      state.error = null;
      state.expirationTime = expirationTime;

      // Set a timer to log out the user after 1 hour
      setTimeout(() => {
        // Automatically log out when the token expires
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
        state.error = null;
        localStorage.removeItem('token');
      }, 60 * 60 * 1000); // 1 hour

      // Optionally, save the expiration time to localStorage or sessionStorage if you want persistence
      localStorage.setItem('expirationTime', expirationTime);
      localStorage.setItem('token', token);
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
    },
    // You can add an action to check for token expiration when the app reloads
    checkTokenExpiration: (state) => {
      const storedExpirationTime = localStorage.getItem('expirationTime');
      if (storedExpirationTime && Date.now() > storedExpirationTime) {
        // Token expired, log out the user
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
        state.error = null;
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
      }
    },
  },
});

export const { loginSuccess, loginFailure, logout, checkTokenExpiration } = authSlice.actions;
export default authSlice.reducer;
