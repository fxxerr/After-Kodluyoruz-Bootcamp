import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../store/features/todo/TodoSlice";
import { useState } from "react";

function TodoComponent() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoReducer.value);

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
