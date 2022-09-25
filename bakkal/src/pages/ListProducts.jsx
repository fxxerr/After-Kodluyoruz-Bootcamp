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
} from "mdb-react-ui-kit";
import { Modal, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import {
  useDeleteProductMutation,
  useFetchProductsQuery,
  useUpdateProductMutation,
} from "../store/productApi";
import { async } from "@firebase/util";
import EditProduct from "./EditProduct";

const ListProducts = () => {
  const { data, isLoading } = useFetchProductsQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [product, setProduct] = useState(null);

  const [deleteProduct] = useDeleteProductMutation();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleShow = (value) => {
    setProduct(value);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  if (isLoading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete ?")) {
      await deleteProduct(id);
      toast.success(" deleted successfully");
    }
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
            <MDBCard className="h-100">
              <MDBCardImage
                src={product.image}
                alt={product.title}
                position="top"
              />
              <MDBCardBody>
                <MDBCardTitle className="text-start">
                  {product.title}
                </MDBCardTitle>

                <MDBCardText className="text-start">
                  <Link to={`/detail/${product.id}`}>Details</Link>
                </MDBCardText>
                <MDBBtn className="mt-1" tag="a" color="none">
                  <MDBIcon
                    far
                    icon="edit"
                    style={{ color: "#dd4b39" }}
                    onClick={() => handleShow(product)}
                    size="lg"
                  />
                </MDBBtn>
                <MDBBtn className="mt-1" tag="a" color="none">
                  <MDBIcon
                    fas
                    icon="trash"
                    style={{ color: "#dd4b39" }}
                    onClick={() => handleDelete(product.id)}
                    size="lg"
                  />
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProduct product={product} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListProducts;
