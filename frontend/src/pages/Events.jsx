import { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button, Badge, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Events() {
  const { user, token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [token]);

  if (loading) return (
    <div className="text-center mt-5">
      <Spinner animation="border" /> Loading events...
    </div>
  );

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Upcoming Events</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {events.map(event => (
          <Col key={event._id}>
            <motion.div whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={event.image || "/default-event.jpg"} alt={event.title} />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>{event.description.slice(0, 80)}...</Card.Text>
                  <div className="mb-2">
                    <Badge bg="info">{event.category}</Badge>{" "}
                    <Badge bg="secondary">{new Date(event.date).toLocaleDateString()}</Badge>{" "}
                    <Badge bg="warning">{event.participants?.length || 0} Participants</Badge>
                  </div>
                  <Link to={`/events/${event._id}`}>
                    <Button variant="primary" className="w-100">View Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
