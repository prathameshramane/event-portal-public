import React, { useState, useEffect } from "react";
import { Table, Container, Badge, Button } from "react-bootstrap";

import { getEntries, markTeamEntry } from "../../services";
import { Loader, ErrorScreen } from "../../components";
import { BRANCH_CAST_ENTRY } from "../../constants/branch";

function EntryTable() {
  const [entries, setEntries] = useState(null);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    setLoading(true);
    getEntries()
      .then((res) => {
        setEntries(res.data);
        if (res.data.length !== 0) {
          var events = [];
          res.data.map((entry) => events.push(entry.event.name));
          events = events.filter(onlyUnique);
          setEvents(events);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const handleMarkAsUsed = (entry) => {
    entry["event"] = entry["event"].id;
    entry["registered_by"] = entry["registered_by"].id;
    entry["branch"] = BRANCH_CAST_ENTRY[entry["branch"]];
    entry.mark_as_used = true;

    setLoading(true);
    markTeamEntry(entry.id, entry)
      .then((res) => {
        return getEntries();
      })
      .then((res) => setEntries(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return loading ? (
    <Loader />
  ) : entries && entries.length > 0 ? (
    <Container>
      <h1 className="mb-3">
        {events &&
          events.length > 0 &&
          events.map((event, index) => {
            var str_event = event;
            if (index !== events.length - 1) str_event += " & ";
            return str_event;
          })}
      </h1>
      <Table striped bordered hover size="sm" responsive={true}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Event Name</th>
            <th>Entry Type</th>
            <th>Participants Name</th>
            <th>Participants College</th>
            <th>Branch</th>
            <th>Class</th>
            <th>Contact No.</th>
            <th>Email</th>
            <th>Mark Entry</th>
          </tr>
        </thead>
        <tbody style={{ height: "20vh" }}>
          {entries &&
            entries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.code}</td>
                <td>{entry.event.name}</td>
                <td>
                  {entry.type === "INTER" ? (
                    <Badge bg="primary">{entry.type}</Badge>
                  ) : (
                    <Badge bg="danger">{entry.type}</Badge>
                  )}
                </td>
                <td>{entry.name}</td>
                <td>{entry.college}</td>
                <td>{entry.branch}</td>
                <td>{entry.class_name}</td>
                <td>{entry.phone}</td>
                <td>{entry.email}</td>
                <td>
                  {entry.mark_as_used ? (
                    <Badge bg="danger">Used</Badge>
                  ) : (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleMarkAsUsed(entry)}
                    >
                      Mark
                    </Button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  ) : (
    <ErrorScreen
      message="You don't have any event alloted"
      sub_message="Contact admin"
    />
  );
}

export default EntryTable;
