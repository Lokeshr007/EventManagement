import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";

export default function AppNavbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Event Management</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/events">Events</Nav.Link>

            {user ? (
              <>
                {user && (user.role === "organizer" || user.role === "admin") && (
                <Nav.Link as={Link} to="/dashboard"> Dashboard</Nav.Link>
        )}

                <Nav.Link as={Link} to="/profile">
                  <FaUserCircle /> {user.name}
                </Nav.Link>
                <Button variant="outline-light" onClick={logout}>
                  <FaSignOutAlt /> Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
