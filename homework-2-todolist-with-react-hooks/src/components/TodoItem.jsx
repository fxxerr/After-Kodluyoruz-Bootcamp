import React from "react";

const TodoItem = ({ todo, DeleteTodo, id }) => {
  const handleClick = (event) => {
    event.target.style.textDecoration
      ? event.target.style.removeProperty("text-decoration")
      : event.target.style.setProperty("text-decoration", "line-through");
  };

  return (
    <div
      className="d-flex justify-content-between bg-light border border-3 align-items-center"
      onClick={handleClick}
    >
      <div className="text-break">{todo}</div>
      <div>
        <button
          onClick={() => {
            DeleteTodo(id);
          }}
          className="btn btn-danger  ms-5 mr-0 pull-right"
        >
          Kaldır
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
