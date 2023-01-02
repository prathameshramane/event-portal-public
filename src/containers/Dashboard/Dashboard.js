import React from "react";
import { Link } from "react-router-dom";

import { Container, Row, Col, Card } from "react-bootstrap";

import { connect } from "react-redux";

import { ReactComponent as EntryIcon } from "../../assets/icons/person-walking-solid.svg";
import { ReactComponent as MarkEntryIcon } from "../../assets/icons/check-to-slot-solid.svg";
import { ReactComponent as MoneyLogIcon } from "../../assets/icons/money-check-dollar-solid.svg";
import { ReactComponent as AddUserIcon } from "../../assets/icons/user-plus-solid.svg";
import { ReactComponent as CodeIcon } from "../../assets/icons/key-solid.svg";

import * as ROUTES from "../../constants/routes";

import { Loader } from "../../components";

function Dashboard({ accountData }) {
  return accountData ? (
    <Container>
      <Row>
        {(accountData.desk || accountData.event_head || accountData.admin) && (
          <Col sm="4">
            <Link to={ROUTES.REGISTER_ENTRY} className="text-decoration-none">
              <Card
                className="bg-primary text-white m-1 text-center shadow "
                style={{ height: "10rem" }}
              >
                <div className="mt-3">
                  <EntryIcon width="5rem" height="5rem" fill="#fff" />
                </div>
                <Card.Body>
                  <Card.Title className="mt-2">Register Entry</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        )}

        {(accountData.event_head || accountData.admin) && (
          <Col sm="4">
            <Link to={ROUTES.MARK_TEAM_ENTRY} className="text-decoration-none">
              <Card
                className="bg-warning text-white m-1 text-center shadow "
                style={{ height: "10rem" }}
              >
                <div className="mt-3">
                  <MarkEntryIcon width="5rem" height="5rem" fill="#fff" />
                </div>
                <Card.Body>
                  <Card.Title className="mt-2">Mark Team Entry</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        )}
        {accountData.admin && (
          <Col sm="4">
            <Link to={ROUTES.LOG_SHEET} className="text-decoration-none">
              <Card
                className="bg-danger text-white m-1 text-center shadow "
                style={{ height: "10rem" }}
              >
                <div className="mt-3">
                  <MoneyLogIcon width="5rem" height="5rem" fill="#fff" />
                </div>
                <Card.Body>
                  <Card.Title className="mt-2">Entry Log Sheets</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        )}
        {accountData.admin && (
          <Col sm="4">
            <Link to={ROUTES.NEW_USER} className="text-decoration-none">
              <Card
                className="bg-success text-white m-1 text-center shadow "
                style={{ height: "10rem" }}
              >
                <div className="mt-3">
                  <AddUserIcon width="5rem" height="5rem" fill="#fff" />
                </div>
                <Card.Body>
                  <Card.Title className="mt-2">Add New User</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        )}
        {accountData.admin && (
          <Col sm="4">
            <Link to={ROUTES.CODE} className="text-decoration-none">
              <Card
                className="bg-secondary text-white m-1 text-center shadow "
                style={{ height: "10rem" }}
              >
                <div className="mt-3">
                  <CodeIcon width="5rem" height="5rem" fill="#fff" />
                </div>
                <Card.Body>
                  <Card.Title className="mt-2">Registration Codes</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        )}
      </Row>
    </Container>
  ) : (
    <Loader />
  );
}

const mapStateToProps = (state) => ({
  accountData: state.auth.data,
});

export default connect(mapStateToProps, null)(Dashboard);
