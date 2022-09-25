import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBIcon,
  MDBRipple,
  MDBRow,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import {
  useDeleteProductMutation,
  useFetchProductsQuery,
} from "../store/productApi";
import { async } from "@firebase/util";
import Rating from "@mui/material/Rating";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import {
  addToBasket,
  clearBasket,
  increaseItem,
  decreaseItem,
  deleteItem,
} from "../store/basketSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const { data, isLoading } = useFetchProductsQuery();

  const dispatch = useDispatch();

  if (isLoading) {
    return <Spinner />;
  }

  const handleBasket = async (product) => {
    dispatch(addToBasket(product));
    toast.success("Added to Cart ");
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1200px",
        alignContent: "center",
      }}
    >
      <MDBRow className="row-cols-1 row-cols-md-3 g-4">
        {data?.map((product) => (
          <MDBCol key={product.id}>
            <MDBCard>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image hover-overlay"
              >
                <MDBCardImage
                  style={{ width: "300px", height: "250px" }}
                  src={product.image}
                  fluid
                  alt={product.title}
                />
                <a href={`/detail/${product.id}`}>
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle>
                  <h6>{product.title}</h6>
                </MDBCardTitle>
                <MDBCardText>
                  <h6>{product.price}TL</h6>
                  <h6>Stock Left:{product.stock}</h6>
                  <Rating value={product.rating} readOnly />
                  <h6>Category: {product.category}</h6>
                </MDBCardText>
                <MDBBtn className="mt-1" tag="a" color="none">
                  <AddShoppingCartOutlinedIcon
                    style={{ color: "black" }}
                    onClick={async () => {
                      handleBasket(product);
                    }}
                  />
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
};

export default Home;
