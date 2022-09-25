import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import {
  useAddProductMutation,
  useFetchProductQuery,
  useUpdateProductMutation,
} from "../store/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const initialState = {
  title: "",
  description: "",
  category: "",
  image: "",
  price: 0,
  rating: 0,
  stock: 0,
};
const AdminProducts = () => {
  const [data, setData] = useState(initialState);

  const [addproduct] = useAddProductMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: product } = useFetchProductQuery(id ? id : skipToken);
  const [updateproduct] = useUpdateProductMutation();

  const { title, description, category, image, price, rating, stock } = data;

  useEffect(() => {
    if (id && product) {
      setData({ ...product });
    }
  }, [id, product]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description) {
      await addproduct(data);
      toast.success("product Added Successfully");
      setData(initialState);
    }
    navigate("/admin");
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h4 className="fw-bold">{id ? "Update product" : "Create product"}</h4>
        <MDBCardBody>
          <MDBValidation className="row g-3" noValidate onSubmit={handleSubmit}>
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide title"
              invalid
            >
              <MDBInput
                label="Title"
                type="text"
                value={title}
                name="title"
                onChange={handleChange}
                className="form-control"
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide description"
              invalid
            >
              <MDBTextArea
                label="Description"
                type="text"
                value={description}
                name="description"
                onChange={handleChange}
                className="form-control"
                rows={4}
                required
              />
            </MDBValidationItem>
            <MDBInput
              label="Category"
              type="text"
              value={category}
              name="category"
              onChange={handleChange}
              className="form-control"
              required
            />
            <MDBInput
              label="ImageURL"
              type="url"
              value={image}
              name="image"
              onChange={handleChange}
              className="form-control"
              required
            />
            <MDBInput
              label="Stock"
              type="number"
              value={stock}
              name="stock"
              onChange={handleChange}
              className="form-control"
              required
            />
            <MDBInput
              label="Price"
              type="number"
              value={price}
              name="price"
              onChange={handleChange}
              className="form-control"
              required
            />
            <MDBInput
              label="Rating"
              type="number"
              value={rating}
              name="rating"
              onChange={handleChange}
              className="form-control"
              required
            />

            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>Submit</MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AdminProducts;
