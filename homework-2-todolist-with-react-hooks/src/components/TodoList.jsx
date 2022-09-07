import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, DeleteTodo }) => {
  //const [todosList,setTodosList]=useState([todos])
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem id={index} todo={todo} key={index} DeleteTodo={DeleteTodo} />
      ))}
    </div>
  );
};

export default TodoList;
