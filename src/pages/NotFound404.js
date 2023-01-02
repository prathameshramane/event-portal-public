import React from "react";

import { Container } from "react-bootstrap";

function NotFound404() {
  return (
    <Container>
      <div
        style={{
          height: "75vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>404 Not Found</h1>
      </div>
    </Container>
  );
}

export default NotFound404;
