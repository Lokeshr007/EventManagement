import { useEffect, useState, useContext } from "react";
import { Container, Card, Button, Badge, Spinner, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function EventDetail() {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Failed to fetch event");
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error(err);
        setError("Error loading event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, token]);

  const handleRegister = async () => {
    if (!user) return alert("Please login to register!");
    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}/register`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to register");
      alert("Registered successfully!");
      setEvent({ ...event, participants: [...(event.participants || []), user] });
    } catch (err) {
      console.error(err);
      alert("Error registering");
    }
  };

  if (loading) return (
    <div className="text-center mt-5">
      <Spinner animation="border" /> Loading event...
    </div>
  );

  if (error) return <h3 className="text-center mt-5 text-danger">{error}</h3>;

  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Img variant="top" src={event.image || "/default-event.jpg"} alt={event.title} />
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>
          <Card.Text>{event.description}</Card.Text>
          <div className="mb-2">
            <Badge bg="info">{event.category}</Badge>{" "}
            <Badge bg="secondary">{new Date(event.date).toLocaleString()}</Badge>{" "}
            <Badge bg="warning">{event.participants?.length || 0} Participants</Badge>
          </div>
          {user && <Button variant="success" onClick={handleRegister}>Register</Button>}
          {event.participants?.length > 0 && user?.role === "organizer" && (
            <>
              <h5 className="mt-4">Participants</h5>
              <ListGroup>
                {event.participants.map((p) => (
                  <ListGroup.Item key={p._id}>{p.name} ({p.email})</ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}