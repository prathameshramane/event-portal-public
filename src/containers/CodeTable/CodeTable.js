import React, { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import { useForm } from "react-hook-form";

import { getAllCodes, addNewCode, getAccountList } from "../../services";

import { Loader, ErrorScreen, ErrorMessage } from "../../components";
import { Alert } from "react-bootstrap";

function CodeTable() {
  const [codes, setCodes] = useState(null);
  const [accountList, setAccountList] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [addNewCodeLoading, setAddNewCodeLoading] = useState(false);
  const [addNewCodeError, setAddNewCodeError] = useState(false);

  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchCodes();
    fetchAccounts();
  }, []);

  const fetchCodes = () => {
    setIsLoading(true);
    getAllCodes()
      .then((res) => {
        setCodes(res.data);
        setIsError(false);
      })
      .catch((err) => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const fetchAccounts = () => {
    setIsLoading(true);
    getAccountList()
      .then((res) => {
        setAccountList(res.data);
        setIsError(false);
      })
      .catch((err) => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const onSubmit = (data) => {
    setAddNewCodeLoading(true);
    addNewCode(data)
      .then((res) => {
        console.log(res.data);
        setAddNewCodeError(false);
        handleClose();
        reset();
        fetchCodes();
      })
      .catch((err) => setAddNewCodeError(true))
      .finally(() => setAddNewCodeLoading(true));
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h1>Registration Codes</h1>
        <div>
          <Button variant="success" onClick={handleShow}>
            Add New Code
          </Button>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorScreen />
      ) : (
        <>
          {codes && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Current Count</th>
                  <th>Assigned To</th>
                  <th>Created On</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {codes.map((code) => (
                  <tr key={code.code}>
                    <td>{code.code}</td>
                    <td>{code.sub_code}</td>
                    <td>{code.assigned_to}</td>
                    <td>{code.created_on}</td>
                    <td>
                      {code.is_active ? (
                        <Badge bg="success">Active</Badge>
                      ) : (
                        <Badge bg="danger">Inactive</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {addNewCodeError && (
            <Alert variant="danger">Something went wrong!</Alert>
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm="12">
                <Form.Group className="mb-3" controlId="code">
                  <Form.Label>Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Registration Code"
                    {...register("code", {
                      required: true,
                    })}
                  />
                  {errors?.code?.type === "required" && (
                    <ErrorMessage error_message="This field is required" />
                  )}
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group className="mb-3" controlId="assignedTo">
                  <Form.Label>Assign To</Form.Label>
                  <Form.Select
                    name="assignedTo"
                    id="assignedTo"
                    {...register("assigned_to", {
                      required: true,
                    })}
                  >
                    {accountList &&
                      accountList.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.name}
                        </option>
                      ))}
                  </Form.Select>
                  {errors?.assigned_to?.type === "required" && (
                    <ErrorMessage error_message="This field is required" />
                  )}
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
                disabled={addNewCodeLoading}
              >
                Close
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={addNewCodeLoading}
              >
                {addNewCodeLoading ? (
                  <Spinner animation="border" size="sm" className="mx-2" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CodeTable;
