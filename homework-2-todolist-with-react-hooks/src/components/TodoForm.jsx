import { useState } from "react";
import React from "react";
import { toast } from "react-toastify";

const TodoForm = ({ todos, setTodos, Cleartodos }) => {
  const [todoValue, setTodoValue] = useState("");

  const handleSubmit = () => {
    if (todoValue.trim() === "") {
      toast.error("Lütfen bir görev giriniz!");
    } else if (todos.includes(todoValue)) {
      toast.error("Bu görev daha önce girildi!");
    } else if (todoValue.trim().length < 3) {
      toast.error("Girdiğiniz değer 2 karakterden büyük olmalıdır");
    } else {
      const newtodoValue = todoValue.trim();
      setTodos([...todos, newtodoValue]);
      toast.success("Todo Added");
    }
  };

  return (
    <div className="input-group">
      <input
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
        id="form-input"
        type="text"
        className="form-control"
        placeholder="Yapılacak Görev Giriniz"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
      <div className="input-group-append">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
            setTodoValue("");
          }}
          className="btn  btn-danger"
          type="button"
        >
          Ekle
        </button>
        <button
          onClick={() => {
            Cleartodos();
          }}
          className="btn btn-primary"
          type="button"
        >
          Temizle
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
