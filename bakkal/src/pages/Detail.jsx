import { skipToken } from "@reduxjs/toolkit/dist/query";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useFetchProductQuery } from "../store/productApi";
import { addToBasket } from "../store/basketSlice";
import { toast } from "react-toastify";

function Detail() {
  const { id } = useParams();
  const {
    data: product,
    error,
    isError,
  } = useFetchProductQuery(id ? id : skipToken);
  const dispatch = useDispatch();

  return (
    <>
      <MDBRow>
        <MDBCol md="6" offsetMd="3" size="6">
          <MDBCard>
            <MDBCardImage
              position="top"
              src={product?.image}
              alt={product?.title}
            />
            <MDBCardBody>
              <MDBCardTitle>
                <h6>{product?.title}</h6>
              </MDBCardTitle>
              <MDBCardText>
                <h6> {product?.description}</h6>
                <br />
                <h6>Category :{product?.category}</h6>
                <h6>{product?.price}TL</h6>
                <br />
                <h6>Stock Left:{product?.stock}</h6>
              </MDBCardText>
              <MDBBtn className="mt-1" tag="a" color="none">
                <AddShoppingCartOutlinedIcon
                  style={{ color: "black" }}
                  onClick={() => {
                    dispatch(addToBasket(product));
                    toast.success("Added to Cart");
                  }}
                />
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default Detail;
