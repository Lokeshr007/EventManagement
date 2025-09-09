// Footer.jsx
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer
      className="bg-dark text-light py-2"
      style={{
        width: "100%",
        fontSize: "0.85rem", // smaller text
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col className="text-center">
            &copy; {new Date().getFullYear()} Event Management. All Rights Reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
