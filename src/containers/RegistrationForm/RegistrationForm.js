import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

import { getAllEvents, registerEntry, getActiveCode } from "../../services";
import {
  BRANCH_CAST_ENTRY,
  CLASS_CAST,
  ENTRY_TYPE,
} from "../../constants/branch";
import { ErrorMessage } from "../../components";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const RegisterSwal = withReactContent(Swal);

function RegistrationForm() {
  const [loading, setLoading] = useState(false);

  const [activeCodeError, setActiveCodeError] = useState(false);

  const [code, setCode] = useState(localStorage.getItem("code"));
  const [subCode, setSubCode] = useState(localStorage.getItem("sub-code"));

  const [events, setEvents] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [amount, setAmount] = useState("0");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchEvents();
    fetchActiveCode();
  }, []);

  const fetchEvents = () => {
    setLoading(true);
    getAllEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => {
        console.log(err);
        RegisterSwal.fire(
          "Something went wrong",
          "Please try again later",
          "error"
        );
      })
      .finally(() => setLoading(false));
  };

  const fetchActiveCode = () => {
    getActiveCode()
      .then((res) => {
        const code_res = res.data;
        setCode(code_res.code);
        setSubCode(code_res.sub_code);
        setActiveCodeError(false);
      })
      .catch((err) => {
        console.log(err);
        setCode(0);
        setSubCode(0);
        setActiveCodeError(true);
      });
  };

  const onSubmit = (data) => {
    data.event = selectedEvent;
    data.code = code + pad(subCode);
    data.main_code = code;
    if (data.class_name === "NULL") delete data.class_name;

    setLoading(true);
    registerEntry(data)
      .then((res) => {
        setSubCode(subCode + 1);
        RegisterSwal.fire(
          "Registration Successful",
          "Participant will receive a mail soon!",
          "success"
        );
        reset();
        setSelectedEvent(null);
        setAmount("0");
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response && err.response.status === 406) {
          RegisterSwal.fire(
            "Entries Exceed",
            "Branch has exceeded the max number of allowed entries.",
            "error"
          );
        } else {
          RegisterSwal.fire(
            "Something went wrong",
            "Please try again later",
            "error"
          );
        }
      })
      .finally(() => setLoading(false));
  };

  const handleEventSelect = (e) => {
    setSelectedEvent(e.target.value);
    const event = events.filter(
      (event) => parseInt(event.id) === parseInt(e.target.value)
    )[0];
    setAmount(event.amount);
  };

  function pad(d) {
    return d < 10 ? "0" + d.toString() : d.toString();
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Select Event</Card.Title>
            <Row>
              <Col sm="6">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="event">Event</Form.Label>
                  <Form.Select
                    id="event"
                    onChange={handleEventSelect}
                    defaultValue="select"
                  >
                    <option disabled value="select">
                      Select Event
                    </option>
                    {events &&
                      events.map((event) => (
                        <option key={event.id} value={event.id}>
                          {event.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="amount">Amount</Form.Label>
                  <Form.Control
                    id="amount"
                    placeholder="Amount"
                    value={amount}
                    disabled
                  />
                  {errors?.amount?.type === "required" && (
                    <ErrorMessage error_message="This field is required" />
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Unique Code</Card.Title>
            <Row>
              <Col sm="8">
                <Row>
                  <Col xs="7">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="code">Code</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        id="code"
                        placeholder="Code"
                        value={code}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="5">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="sub-code">Sub-Code</Form.Label>
                      <Form.Control
                        type="text"
                        id="sub-code"
                        placeholder="Sub Code"
                        value={subCode}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            {activeCodeError && (
              <ErrorMessage
                error_message={
                  "No registration code available for you. Contact admin and try refreshing the page."
                }
              />
            )}
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Participants Information</Card.Title>
            <Row>
              <Col sm="6">
                <Form.Group className="mb-3" controlId="type">
                  <Form.Label>Entry Type</Form.Label>
                  <Form.Select
                    name="type"
                    id="type"
                    {...register("type", {
                      required: true,
                    })}
                  >
                    {Object.entries(ENTRY_TYPE).map(([key, value]) => (
                      <option key={value} value={value}>
                        {key}
                      </option>
                    ))}
                  </Form.Select>
                  {errors?.type?.type === "required" && (
                    <ErrorMessage error_message="This field is required" />
                  )}
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group className="mb-3" controlId="fullname">
                  <Form.Label>College Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter College Name"
                    {...register("college", {
                      required: true,
                    })}
                  />
                  {errors?.college?.type === "required" && (
                    <ErrorMessage error_message="This field is required" />
                  )}
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group className="mb-3" controlId="fullname">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Full Name"
                    {...register("name", {
                      required: true,
                    })}
                  />
                  <Form.Text className="text-muted">
                    (First-Name) (Middle-Name) (Last-Name)
                  </Form.Text>
                  {errors?.name?.type === "required" && (
                    <ErrorMessage error_message="This field is required" />
                  )}
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group className="mb-3" controlId="branch">
                  <Form.Label>Branch</Form.Label>
                  <Form.Select
                    name="branch"
                    id="branch"
                    {...register("branch", {
                      required: true,
                    })}
                  >
                    {Object.entries(BRANCH_CAST_ENTRY).map(([key, value]) => (
                      <option key={value} value={value}>
                        {key}
                      </option>
                    ))}
                  </Form.Select>
                  {errors?.branch?.type === "required" && (
                    <ErrorMessage error_message="This field is required" />
                  )}
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group className="mb-3" controlId="class_name">
                  <Form.Label>Class</Form.Label>
                  <Form.Select
                    name="class_name"
                    id="class_name"
                    defaultValue={"NULL"}
                    {...register("class_name", {
                      required: false,
                    })}
                  >
                    <option disabled value="NULL">
                      Select class
                    </option>
                    {Object.entries(CLASS_CAST).map(([key, value]) => (
                      <option key={value} value={value}>
                        {key}
                      </option>
                    ))}
                  </Form.Select>
                  {errors?.class_name?.type === "required" && (
                    <ErrorMessage error_message="This field is required" />
                  )}
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Enter Phone Number"
                    {...register("phone", {
                      required: true,
                    })}
                  />
                  {errors?.phone?.type === "required" && (
                    <ErrorMessage error_message="This field is required" />
                  )}
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    {...register("email", {
                      required: true,
                    })}
                  />
                </Form.Group>
                {errors?.email?.type === "required" && (
                  <ErrorMessage error_message="This field is required" />
                )}
              </Col>
              <Col sm="6">
                <Form.Group className="mb-3" controlId="payment_status">
                  <Form.Label>Payment Status</Form.Label>
                  <Form.Select
                    id="payment_status"
                    name="payment_status"
                    {...register("payment_status", {
                      required: true,
                    })}
                  >
                    <option value="P">Pending</option>
                    <option value="S">Successfully Paid</option>
                  </Form.Select>
                  {errors?.payment_status?.type === "required" && (
                    <ErrorMessage error_message="This field is required" />
                  )}
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group className="mb-3" controlId="remark">
                  <Form.Label>Remark</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="remark"
                    placeholder="Leave a remark here"
                    {...register("remark", {
                      required: false,
                    })}
                  />
                </Form.Group>
              </Col>
              <div className="d-flex justify-content-start">
                <Button type="submit" disabled={loading} className="px-5 py-2">
                  {loading ? (
                    <Spinner animation="border" size="sm" className="mx-2" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </Row>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  );
}

export default RegistrationForm;
