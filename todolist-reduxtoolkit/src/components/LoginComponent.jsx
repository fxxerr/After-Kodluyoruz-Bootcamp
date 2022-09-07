import React from "react";
import { useDispatch } from "react-redux";
import { loginAction, logoutAction } from "../store/features/login/LoginSlice";

function LoginComponent() {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>LoginComponent</h1>
      <button
        onClick={() => {
          dispatch(loginAction({ name: "tugberk", surname: "muratoglu" }));
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          dispatch(logoutAction());
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default LoginComponent;
