import { Button, Container, Form } from "react-bootstrap";

import React, { useContext, useState } from "react";
import { socketContext } from "./socketProvider";

function Auth() {
  const { openConnection } = useContext(socketContext);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (credential) => {
    if (credential.length === 0) {
      setError(true);
      return;
    }

    openConnection(credential);
  };

  return (
    <Container
      style={{ display: "grid", placeContent: "center", height: "100vh" }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            padding: "20px",
            backgroundColor: "lavender",
            borderRadius: "0.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3>Welcome To Socket.io</h3>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {error && (
            <Form.Text id="passwordHelpBlock" className="text-danger">
              Invalid Username!
            </Form.Text>
          )}
          <Button
            onClick={() => handleLogin(name)}
            style={{ marginTop: "10px" }}
          >
            Login
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Auth;
