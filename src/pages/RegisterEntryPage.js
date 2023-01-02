import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import { ADMIN_LOGIN } from "../constants/routes";
import { RegistrationForm } from "../containers";

function RegisterEntryPage({ isAuthenticated }) {
  if (!isAuthenticated) return <Navigate replace to={`/${ADMIN_LOGIN}`} />;

  return (
    <Container className="mt-5">
      <RegistrationForm />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(RegisterEntryPage);
