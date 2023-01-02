import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import { ADMIN_LOGIN } from "../constants/routes";
import { CodeTable } from "../containers";

function CodePage({ isAuthenticated }) {
  if (!isAuthenticated) return <Navigate replace to={`/${ADMIN_LOGIN}`} />;

  return (
    <Container className="mt-5">
      <CodeTable />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(CodePage);
