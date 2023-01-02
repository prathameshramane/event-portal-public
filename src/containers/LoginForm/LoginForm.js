import React from "react";
import logo from "../../assets/logo.png";

import { Card, Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { connect } from "react-redux";
import { login } from "../../redux/auth/authActions";
import { BASE_ADMIN_ROUTE } from "../../constants/routes";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const LoginSwal = withReactContent(Swal);

function LoginForm(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props
      .login(data.username, data.password)
      .then(() => {
        reset();
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          LoginSwal.fire(
            "Invalid Credentials",
            "Please enter the correct username & password",
            "error"
          );
        } else {
          console.error(err);
          LoginSwal.fire(
            "Something went wrong",
            "Please try again later!",
            "error"
          );
        }
      });
  };

  if (props.auth.isAuthenticated)
    return <Navigate replace to={`/${BASE_ADMIN_ROUTE}`} />;

  return (
    <Card
      style={{ width: "35rem" }}
      className="shadow-lg p-3 mb-5 bg-body rounded"
    >
      <Card.Body>
        <Card.Title className="text-center mb-3">
          <img src={logo} alt="Logo" style={{ width: "8rem" }} />
          <br />
          <p className="mt-3">Members Login</p>
        </Card.Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" && (
              <p className="text-danger mt-1">Username is required</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="passoword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.username?.type === "required" && (
              <p className="text-danger mt-1">Password is required</p>
            )}
          </Form.Group>
          <div className="d-grid">
            <Button
              type="submit"
              variant="primary"
              disabled={props.auth.loading}
            >
              {props.auth.loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDistpactToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password)),
});

export default connect(mapStateToProps, mapDistpactToProps)(LoginForm);
