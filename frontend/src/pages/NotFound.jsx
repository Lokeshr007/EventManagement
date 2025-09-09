import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container className="text-center my-5">
      <h1 className="display-3">404</h1>
      <p className="lead">Page Not Found</p>
      <Link to="/">
        <Button variant="primary">Go Home</Button>
      </Link>
    </Container>
  );
}

