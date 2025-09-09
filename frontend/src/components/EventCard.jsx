import { Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import API from "../api/axios";

export default function EventCard({ event }) {
  const handleRegister = async () => {
    try {
      await API.post(`/events/${event._id}/register`);
      alert("Registered successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error registering");
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card className="h-100 shadow-sm">
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>
          <Card.Text>{event.description}</Card.Text>
          <Card.Text><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</Card.Text>
          <Card.Text><strong>Location:</strong> {event.location}</Card.Text>
          <Button variant="success" onClick={handleRegister} whileHover={{ scale: 1.1 }}>
            Register
          </Button>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
