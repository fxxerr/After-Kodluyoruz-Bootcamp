import React from "react";
import { useSelector } from "react-redux";

function ProfileComponent() {
  const user = useSelector((state) => state.LoginReducer.value);
  return (
    <div>
      <h1>ProfileComponent</h1>
      <p>Name:{user.name}</p>
      <p>Surname:{user.surname}</p>
    </div>
  );
}

export default ProfileComponent;
