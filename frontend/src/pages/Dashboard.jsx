import { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Modal,
  Form,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    image: "",
  });

  // Fetch events after user is loaded
useEffect(() => {
  if (!user?.token) return; // Only fetch if logged in

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/events/my", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
      setError("Error fetching your events.");
    } finally {
      setLoading(false);
    }
  };

  fetchEvents();
}, [user]);


  // Delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) throw new Error("Failed to delete");
      setEvents(events.filter((e) => e._id !== id));
    } catch (err) {
      alert("Error deleting event");
      console.error(err);
    }
  };

  // Add new event
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to create event");
      const newEvent = await res.json();
      setEvents([...events, newEvent]);
      setShowModal(false);
      setFormData({ title: "", description: "", category: "", date: "", image: "" });
    } catch (err) {
      console.error(err);
      alert("Error creating event");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> Loading your events...
      </div>
    );

  if (error) return <h3 className="text-center mt-5 text-danger">{error}</h3>;

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Events</h2>
        <Button variant="success" onClick={() => setShowModal(true)}>
          Add New Event
        </Button>
      </div>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {events.map((event) => (
          <Col key={event._id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={event.image || "/default-event.jpg"}
                  alt={event.title}
                />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>{event.description.slice(0, 60)}...</Card.Text>
                  <div className="mb-2">
                    <Badge bg="info">{event.category}</Badge>{" "}
                    <Badge bg="secondary">
                      {new Date(event.date).toLocaleDateString()}
                    </Badge>{" "}
                    <Badge bg="warning">
                      {event.participants?.length || 0} Participants
                    </Badge>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="primary"
                      onClick={() => alert("Edit feature coming soon!")}
                    >
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(event._id)}>
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Add Event Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleModalSubmit}>
            {["title", "description", "category", "date", "image"].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                <Form.Control
                  type={
                    field === "description"
                      ? "textarea"
                      : field === "date"
                      ? "datetime-local"
                      : "text"
                  }
                  as={field === "description" ? "textarea" : undefined}
                  rows={field === "description" ? 3 : undefined}
                  required={field !== "image"}
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                />
              </Form.Group>
            ))}
            <Button type="submit" variant="success">
              Add Event
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
