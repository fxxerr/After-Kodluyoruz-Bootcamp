import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: "", surname: "" };

export const LoginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    loginAction: (state, action) => {
      state.value = action.payload;
    },
    logoutAction: (state) => {
      state.value = initialState;
    },
  },
});

export const LoginReducer = LoginSlice.reducer;
export const { loginAction, logoutAction } = LoginSlice.actions;
