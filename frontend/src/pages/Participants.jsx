import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Table, Spinner } from "react-bootstrap";
import API from "../api/axios";

export default function Participants() {
  const { eventId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await API.get(`/events/${eventId}/participants`);
        setParticipants(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchParticipants();
  }, [eventId]);

  if (loading) return <Spinner animation="border" className="mt-5" />;

  return (
    <Container className="mt-4">
      <h3>Participants</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {participants.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
