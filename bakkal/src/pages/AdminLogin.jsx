import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase_config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useEffect } from "react";

function AdminLogin() {
  const [error, SetError] = useState(false);
  const [email, SetEmail] = useState("");
  const [pass, SetPass] = useState("");
  const [isAuth, SetisAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const statue = JSON.parse(localStorage.getItem("admin"));
    if (statue) {
      SetisAuth(true);
    }
  }, [isAuth]);

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;

        SetisAuth(true);
        localStorage.setItem("admin", JSON.stringify(true));
      })
      .catch((error) => {
        SetError(true);
      });
  };

  return (
    <div className="d-flex justify-content-center">
      {isAuth ? (
        navigate("/admin")
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => SetPass(e.target.value)}
              value={pass}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          {error && <p style={{ color: "red" }}>Hatalı Giriş</p>}
        </Form>
      )}
    </div>
  );
}

export default AdminLogin;
