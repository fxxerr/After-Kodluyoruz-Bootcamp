import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { useFetchOrdersQuery } from "../store/productApi";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const { data, isLoading } = useFetchOrdersQuery();
  const [orders, setOrders] = useState([]);

  if (isLoading) {
    return <Spinner />;
  } else {
    data.forEach((order) => {
      orders.push({
        date: new Date(order.timestamp).toLocaleDateString("tr-TR"),
        total: order.total,
      });
    });
  }

  console.log("orders", orders);

  return (
    <MDBContainer className="m-5">
      <MDBRow>
        <MDBCol>
          <div style={{ width: "500px", height: "500px" }}>
            <h6>Total Sales Over Time</h6>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={[...orders]}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default AdminDashboard;
