import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

import Navbar from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Detail from "./pages/Detail";
import EditProduct from "./pages/EditProduct";
import { useEffect } from "react";
import ListProducts from "./pages/ListProducts";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/admin/edit/:id" element={<EditProduct />} />
          <Route path="/admin/products" element={<ListProducts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
