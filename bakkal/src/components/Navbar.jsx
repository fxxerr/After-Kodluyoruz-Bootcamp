import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBContainer,
  MDBNavbarBrand,
  MDBBtn,
  MDBNavbarLink,
  MDBBadge,
} from "mdb-react-ui-kit";
import { MDBIcon } from "mdb-react-ui-kit";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const basket = useSelector((state) => state.basketSlice.basket);
  const navigate = useNavigate();
  return (
    <MDBNavbar expand="lg" dark bgColor="dark">
      <MDBContainer fluid>
        <MDBNavbarBrand tag="span" className=" mb-0 h1 fw-bold">
          Techno Store
        </MDBNavbarBrand>
        <div style={{ float: "right", marginRight: "50px" }}>
          <MDBNavbarNav className="mb-2 mb-lg-0" fullWidth={false}>
            <MDBNavbarItem>
              <p className="header-text" onClick={() => navigate("/")}>
                Home
              </p>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <p
                className="header-text"
                onClick={() => navigate("/adminlogin")}
              >
                Admin
              </p>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/basket">
                <MDBBadge pill color="danger">
                  {basket.length}
                </MDBBadge>
                <span>
                  <MDBIcon fas icon="shopping-cart"></MDBIcon>
                </span>
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
