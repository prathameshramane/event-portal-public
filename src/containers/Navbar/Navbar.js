import React from "react";
import logo from "../../assets/logo-bw.png";
import "./styles.css";

import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as LogoutIcon } from "../../assets/icons/sign-out-alt-solid.svg";

import { connect } from "react-redux";
import { logout } from "../../redux/auth/authActions";

function Navbar({ isAuthenticated, logout }) {
  const handleLogout = () => {
    logout();
  };
  return (
    <Container
      fluid
      className="bg-dark d-flex align-items-center"
      style={{ height: "6rem" }}
    >
      <Container>
        <Row>
          <Col xs="2" sm="1">
            <img src={logo} className="App-logo" alt="logo" />
          </Col>
          <Col
            xs="9"
            sm="8"
            className="ms-4 text-white d-flex align-items-center"
          >
            <h3>Event | Portal </h3>
          </Col>
          <Col
            sm="2"
            xs="12"
            className="d-flex align-items-center justify-content-end"
          >
            {isAuthenticated && (
              <div
                onClick={handleLogout}
                className="text-white text-decoration-none"
                style={{ cursor: "pointer" }}
              >
                <span className="me-3">Logout</span>
                <LogoutIcon fill="white" width="25px" height="25px" />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
