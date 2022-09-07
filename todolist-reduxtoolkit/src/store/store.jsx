import { LoginReducer } from "./features/login/LoginSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./features/todo/TodoSlice";

const rootReducer = combineReducers({
  LoginReducer,
  todoReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
