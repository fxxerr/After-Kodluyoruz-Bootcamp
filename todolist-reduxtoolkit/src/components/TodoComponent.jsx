import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/features/todo/TodoSlice";

function TodoComponent() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      <h1>TodoComponent</h1>
      <input
        value={todo}
        type="text"
        placeholder="Enter your todo"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch(addTodo(todo));
          setTodo("");
        }}
      >
        Add
      </button>
      <button>Clear</button>
      <div></div>
    </div>
  );
}

export default TodoComponent;
