import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import { BASE_ADMIN_ROUTE } from "../constants/routes";
import { LoginForm } from "../containers";

function LoginPage({ isAuthenticated }) {
  if (isAuthenticated) return <Navigate replace to={`/${BASE_ADMIN_ROUTE}`} />;

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "90vh",
        backgroundColor: "#ececec",
      }}
    >
      <LoginForm />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(LoginPage);
