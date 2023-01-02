import React, { useState } from "react";
import { Form, Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { signup } from "../../services";
import { ErrorMessage } from "../../components";
import { BRANCH_CAST_ACCOUNT } from "../../constants/branch";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const NewUserSwal = withReactContent(Swal);

function NewUser() {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    signup(data)
      .then((res) => {
        NewUserSwal.fire(
          "Registration Successful",
          "User can now login!",
          "success"
        );
        reset();
        setServerErrors(null);
      })
      .catch((err) => {
        console.error(err);
        if (err.response) setServerErrors(err.response.data);
        NewUserSwal.fire(
          "Something went wrong",
          "Please try again later",
          "error"
        );
      })
      .finally(() => setLoading(false));
  };

  console.log(serverErrors);

  return (
    <Container className="mb-5">
      <h1 className="mb-3">Register New User</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Full Name
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              name="name"
              {...register("name", {
                required: true,
              })}
            />
            {errors?.name?.type === "required" && (
              <ErrorMessage error_message="This field is required" />
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Email
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="email"
              name="email"
              {...register("email", {
                required: true,
              })}
            />
            {errors?.email?.type === "required" && (
              <ErrorMessage error_message="This field is required" />
            )}
            {serverErrors && serverErrors.email && (
              <ErrorMessage error_message={serverErrors.email[0]} />
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Phone
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="number"
              name="phone"
              {...register("phone", {
                required: true,
              })}
            />
            {errors?.phone?.type === "required" && (
              <ErrorMessage error_message="This field is required" />
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Year
          </Form.Label>
          <Col sm="9">
            <Form.Select
              name="year"
              defaultValue="FE"
              {...register("year", {
                required: true,
              })}
            >
              <option value="FE">First Year</option>
              <option value="SE">Second Year</option>
              <option value="TE">Third Year</option>
              <option value="BE">Fourth Year</option>
            </Form.Select>
            {errors?.year?.type === "required" && (
              <ErrorMessage error_message="This field is required" />
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Branch
          </Form.Label>
          <Col sm="9">
            <Form.Select
              name="branch"
              defaultValue="FE"
              {...register("branch", {
                required: true,
              })}
            >
              {Object.entries(BRANCH_CAST_ACCOUNT).map(([key, value]) => (
                <option key={value} value={value}>
                  {key}
                </option>
              ))}
            </Form.Select>
            {errors?.branch?.type === "required" && (
              <ErrorMessage error_message="This field is required" />
            )}
          </Col>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label column sm="3">
            Access Level
          </Form.Label>
          <Form.Check
            type="checkbox"
            label="Desk"
            {...register("desk", {
              required: false,
            })}
          />
          <Form.Check
            type="checkbox"
            label="Event Head"
            {...register("event_head", {
              required: false,
            })}
          />
          <Form.Check
            type="checkbox"
            label="Admin"
            {...register("admin", {
              required: false,
            })}
          />
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Username
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              name="username"
              {...register("username", {
                required: true,
              })}
            />
            {errors?.username?.type === "required" && (
              <ErrorMessage error_message="This field is required" />
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Password
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              name="password"
              {...register("password", {
                required: true,
              })}
            />
            {errors?.password?.type === "required" && (
              <ErrorMessage error_message="This field is required" />
            )}
            {serverErrors && serverErrors.non_field_errors && (
              <ErrorMessage error_message={serverErrors.non_field_errors[0]} />
            )}
          </Col>
        </Form.Group>

        <div className="d-flex justify-content-end mt-4">
          <Button variant="success" type="submit" disabled={loading}>
            {loading && (
              <Spinner animation="border" size="sm" className="mx-2" />
            )}
            Create User
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default NewUser;
