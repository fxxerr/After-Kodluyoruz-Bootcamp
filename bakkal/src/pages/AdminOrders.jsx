import {
  MDBCol,
  MDBListGroupItem,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useFetchOrdersQuery } from "../store/productApi";

function AdminOrders() {
  const { data, isLoading } = useFetchOrdersQuery();
  const [total, setTotal] = useState(0);
  console.log(data);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <MDBRow>
        <MDBCol>
          {Object.values(data).map((order) => (
            <MDBTable
              className="border rounded m-3"
              key={order.id}
              align="middle"
            >
              <MDBTableHead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Count</th>
                  <th scope="col">Price</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {order.items.map((item) => (
                  <tr>
                    <td>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                    </td>
                    <td>
                      <p className="fw-normal mb-1"> {item.title} </p>
                    </td>
                    <td>{item.count} </td>
                    <td>{item.price} TL</td>
                  </tr>
                ))}
                <td>
                  <h6>
                    Date:{new Date(order.timestamp).toLocaleDateString("tr-TR")}{" "}
                  </h6>
                </td>
                <td></td>
                <td></td>
                <td>
                  <h6>Total:</h6>
                  {order.total}TL
                </td>
              </MDBTableBody>
            </MDBTable>
          ))}
        </MDBCol>

        <MDBCol className="mt-5">
          <h3>Total Sale</h3>
          <p>{data.reduce((acc, item) => acc + item.total, 0).toFixed(2)}TL</p>
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default AdminOrders;
