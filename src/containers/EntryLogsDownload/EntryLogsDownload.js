import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

import { getLogSheet, getAllEvents } from "../../services";
import { BRANCH_CAST_ENTRY, ENTRY_TYPE } from "../../constants/branch";

function EntryLogsDownload() {
  const [events, setEvents] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    getAllEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEventSelect = (e) => {
    setSelectedEvent(e.target.value);
  };

  const handleBranchSelect = (e) => {
    setSelectedBranch(e.target.value);
  };

  const handleTypeSelect = (e) => {
    setSelectedType(e.target.value);
  };

  const handleDownload = () => {
    getLogSheet(selectedEvent, selectedBranch, selectedType)
      .then((res) => {})
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <Row>
        <Col sm="12" className="mb-3">
          <Form.Select
            id="branch"
            onChange={handleBranchSelect}
            defaultValue="select"
          >
            <option disabled value="select">
              Select Branch
            </option>
            {Object.entries(BRANCH_CAST_ENTRY).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col sm="12" className="mb-3">
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
        </Col>
        <Col sm="12" className="mb-3">
          <Form.Select
            id="type"
            onChange={handleTypeSelect}
            defaultValue="select"
          >
            <option disabled value="select">
              Select Entry Type
            </option>
            {Object.entries(ENTRY_TYPE).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col sm="12">
          <Button onClick={handleDownload}>Download</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default EntryLogsDownload;
