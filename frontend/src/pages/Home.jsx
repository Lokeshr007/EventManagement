import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaCalendarAlt, FaUsers, FaChartLine, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Container className="mt-5">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-5"
      >
        <h1>Welcome to Event Management</h1>
        <p className="lead">
          Organize, discover, and participate in events easily.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <Link to="/events">
            <Button variant="primary">Browse Events</Button>
          </Link>
          {!user && (
            <Link to="/register">
              <Button variant="success">Register Now</Button>
            </Link>
          )}
        </div>
      </motion.div>

      {/* Why This Website */}
      <h2 className="text-center mb-4">Why Choose Us?</h2>
      <Row className="g-4 mb-5">
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm h-100">
            <FaCalendarAlt size={40} className="mb-2 text-primary" />
            <Card.Body>
              <Card.Title>Organize Events</Card.Title>
              <Card.Text>Create and manage your events efficiently.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm h-100">
            <FaUsers size={40} className="mb-2 text-success" />
            <Card.Body>
              <Card.Title>Manage Participants</Card.Title>
              <Card.Text>Track attendees and registrations seamlessly.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm h-100">
            <FaChartLine size={40} className="mb-2 text-warning" />
            <Card.Body>
              <Card.Title>Analytics</Card.Title>
              <Card.Text>Monitor event performance and participation trends.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm h-100">
            <FaCheckCircle size={40} className="mb-2 text-info" />
            <Card.Body>
              <Card.Title>Easy Registration</Card.Title>
              <Card.Text>Participants can register with just one click.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* How to Use */}
      <h2 className="text-center mb-4">How to Use?</h2>
      <Row className="g-4 mb-5">
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm h-100">
            <Card.Body>
              <Card.Title>1. Sign Up / Login</Card.Title>
              <Card.Text>Create an account to get started.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm h-100">
            <Card.Body>
              <Card.Title>2. Browse Events</Card.Title>
              <Card.Text>Explore events and find what interests you.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm h-100">
            <Card.Body>
              <Card.Title>3. Register / Create</Card.Title>
              <Card.Text>Participants register, organizers create events.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm h-100">
            <Card.Body>
              <Card.Title>4. Track & Enjoy</Card.Title>
              <Card.Text>Monitor participants and enjoy the event.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
