import { Button, Form } from "react-bootstrap";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_BE_URL;
      const response = await fetch(`${apiUrl}/authors/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("logindata", data);
        // console.log("accessToken", data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
        // localStorage.setItem("refreshToken", data.refreshToken);
        navigate("/home");
        // window.location.href = "/home";
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form className="login-form " onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>

      <Link to="/register">Click here to register!</Link>
    </Form>
  );
};

export default LoginForm;
