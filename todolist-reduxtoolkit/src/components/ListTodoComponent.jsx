import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, todoCompleted } from "../store/features/todo/TodoSlice";

function ListTodoComponent() {
  const todos = useSelector((state) => state.todoReducer.todos);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Your Todo List</h1>
      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              <span>{todo.title}</span>----
              <span>{String(todo.completed)}</span>
              <button onClick={() => dispatch(removeTodo(index))}>
                Delete
              </button>
              <button onClick={() => dispatch(todoCompleted(index))}>
                Complete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListTodoComponent;
