import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_BE_URL;
      const response = await fetch(`${apiUrl}/authors/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("RegisterData", data);
        navigate("/");
        // window.location.href = "/";
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form justify-content-center">
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your first name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="surname">
        <Form.Label>Surname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your last name"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
      <Link to="/">already registered</Link>
    </Form>
  );
};

export default RegistrationForm;
