import TodoForm from "./components/TodoForm";
import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const DeleteTodo = (id) => {
    setTodos(todos.filter((todo, index) => index !== id));
  };
  const Cleartodos = () => {
    setTodos([]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div className="container py-5 h-100 ">
        <div className="row d-flex justify-content-center align-items-center h-100 ">
          <div className="col-4 ">
            <div>
              <br />
              <br />
              <h1>Yapılacaklar Listesi</h1>
            </div>

            <br />
            <ToastContainer />
            <TodoForm
              todos={todos}
              setTodos={setTodos}
              Cleartodos={Cleartodos}
            />
            <br />
            <br />
            <h2>Görevler</h2>
            <br />

            <TodoList todos={todos} DeleteTodo={DeleteTodo} />
          </div>
        </div>
      </div>
    </>
  );
}
