import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import { useNavigate } from "react-router-dom";
import EditProduct from "./ListProducts";
import ListProducts from "./ListProducts";
import { Modal, Alert } from "react-bootstrap";
import {
  MDBBtn,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
} from "mdb-react-ui-kit";
import LogoutIcon from "@mui/icons-material/Logout";

function Admin() {
  const [productButton, setProductButton] = useState(false);
  const [listproductButton, setlistProductButton] = useState(false);
  const [dashboardButton, setDashButton] = useState(false);
  const [ordersButton, setOrderButton] = useState(false);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [showNavText, setShowNavText] = useState(false);
  return (
    <>
      <div>
        <MDBNavbar expand="lg" light bgColor="light">
          <MDBContainer fluid>
            <MDBNavbarBrand>
              <h4>Administrator Tools</h4>
            </MDBNavbarBrand>
            <MDBNavbarToggler
              type="button"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShowNavText(!showNavText)}
            >
              <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>
            <MDBCollapse navbar show={showNavText}>
              <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                <MDBNavbarItem>
                  <MDBNavbarLink
                    onClick={() => {
                      setDashButton(true);
                      setProductButton(false);
                      setOrderButton(false);
                      setlistProductButton(false);
                    }}
                    active
                    aria-current="page"
                    href="#"
                  >
                    Dashboard
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    href="#"
                    active
                    onClick={() => {
                      setDashButton(false);
                      setProductButton(false);
                      setOrderButton(false);
                      setlistProductButton(true);
                    }}
                  >
                    Products
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    href="#"
                    active
                    onClick={() => {
                      setDashButton(false);
                      setProductButton(true);
                      setOrderButton(false);
                      setlistProductButton(false);
                    }}
                  >
                    Add Product
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    href="#"
                    active
                    onClick={() => {
                      setDashButton(false);
                      setProductButton(false);
                      setOrderButton(true);
                      setlistProductButton(false);
                    }}
                  >
                    Orders
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
            <MDBNavbarBrand>
              <button>
                <LogoutIcon
                  href="#"
                  onClick={() => {
                    localStorage.setItem("admin", JSON.stringify(false));
                    navigate("/");
                  }}
                />
              </button>
            </MDBNavbarBrand>
          </MDBContainer>
        </MDBNavbar>
      </div>
      {dashboardButton && <AdminDashboard />}
      {ordersButton && <AdminOrders />}
      {productButton && <AdminProducts />}
      {listproductButton && <ListProducts />}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdminProducts />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Admin;
