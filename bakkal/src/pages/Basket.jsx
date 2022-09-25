import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBList,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBBtnGroup,
  MDBCardHeader,
} from "mdb-react-ui-kit";

import { toast } from "react-toastify";
import {
  productsApi,
  useBasketProductMutation,
  useFetchProductsQuery,
} from "../store/productApi";
import { async } from "@firebase/util";
import { Timestamp } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  clearBasket,
  increaseItem,
  decreaseItem,
  deleteItem,
} from "../store/basketSlice";

function Basket() {
  //  const { data, isLoading } = useFetchProductsQuery();
  //  const basketdata = data.filter((product) => {
  //    return product.basket === true;
  //  });

  const basket = useSelector((state) => state.basketSlice.basket);

  const dispatch = useDispatch();

  const [sendOrders] = useBasketProductMutation();

  const [total, setTotal] = useState(0);

  function handleDelete() {
    dispatch(clearBasket());
  }
  const itemDelete = (product) => {
    dispatch(deleteItem(product));
  };

  const makeOrder = async () => {
    console.log("sepet", total, basket);
    await sendOrders({ total: total, items: basket });
    await handleDelete();
    await toast.success("Order Completed");
  };

  function handleIncrease(product) {
    dispatch(increaseItem(product));
  }
  function handleDecrease(product) {
    dispatch(decreaseItem(product));
  }

  useEffect(() => {
    var total = basket
      .reduce((acc, item) => acc + item.count * item.price, 0)
      .toFixed(2);
    setTotal(Number(total));
  }, [basket]);
  console.log(total);
  return (
    <>
      <MDBRow className="justify-content-between">
        <MDBCol>
          <MDBListGroup className="m-5" style={{ minWidth: "22rem" }} light>
            {basket.map((product) => (
              <MDBListGroupItem
                key={product.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{product.title}</p>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <MDBRow>
                    <MDBCol>{product.price}TL</MDBCol>
                    <MDBCol>
                      <MDBBtnGroup
                        className="d-flex float-right align-items-center "
                        shadow="0"
                      >
                        <MDBBtn
                          onClick={() => {
                            handleDecrease(product);
                          }}
                          color="light"
                        >
                          -
                        </MDBBtn>
                        {product.count}
                        <MDBBtn
                          onClick={() => {
                            handleIncrease(product);
                          }}
                          color="light"
                        >
                          +
                        </MDBBtn>
                      </MDBBtnGroup>
                    </MDBCol>{" "}
                    <MDBCol>
                      <button onClick={() => itemDelete(product)}>
                        <MDBIcon fas icon="trash" />
                      </button>
                    </MDBCol>
                  </MDBRow>
                </div>
              </MDBListGroupItem>
            ))}
          </MDBListGroup>
        </MDBCol>
        <MDBCol className="col-4 m-5">
          <MDBCard
            style={{ width: "250px" }}
            background="dark"
            className=" text-white"
          >
            <MDBCardHeader>Total Price</MDBCardHeader>
            <MDBCardBody>
              <MDBCardText>
                {total}
                TL
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow className="fixed-bottom mb-5">
        <MDBCol>
          <MDBBtn color="dark" onClick={makeOrder}>
            Complete Shopping
          </MDBBtn>
          <MDBBtn color="danger" onClick={() => handleDelete()}>
            Delete All
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default Basket;
