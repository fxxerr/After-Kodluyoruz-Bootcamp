import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  useFetchProductQuery,
  useUpdateProductMutation,
} from "../store/productApi";
import { async } from "@firebase/util";

function EditProduct({ product }) {
  //console.log("editproduct", product);

  //let product = { ...product };
  //const [product, setproduct] = useState(product);

  const [updateproduct] = useUpdateProductMutation();

  //const handleChange = (e) => {
  //  setproduct({ ...product, [e.target.name]: e.target.value });
  //};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newproduct = {
      ...product,
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
      stock: e.target.stock.value,
      price: e.target.price.value,
    };

    await updateproduct({ id: product.id, data: newproduct });
  };

  return (
    <div>
      <MDBCard alignment="center">
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
                name="title"
                defaultValue={product.title}
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
                name="description"
                defaultValue={product.description}
                className="form-control"
                rows={4}
                required
              />
            </MDBValidationItem>
            <MDBInput
              label="Category"
              type="text"
              name="category"
              defaultValue={product.category}
              className="form-control"
              required
            />
            <MDBInput
              label="ImageURL"
              type="url"
              name="image"
              defaultValue={product.image}
              className="form-control"
              required
            />
            <MDBInput
              label="Stock"
              type="number"
              name="stock"
              defaultValue={product.stock}
              className="form-control"
              required
            />
            <MDBInput
              label="Price"
              type="number"
              name="price"
              defaultValue={product.price}
              className="form-control"
              required
            />

            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>Update</MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default EditProduct;
