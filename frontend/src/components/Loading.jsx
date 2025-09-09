import { Spinner, Container } from "react-bootstrap";

export default function Loading() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
      <Spinner animation="border" variant="primary" role="status" />
    </Container>
  );
}