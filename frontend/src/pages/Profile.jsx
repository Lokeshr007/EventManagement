import { useState, useContext } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

export default function Profile() {
  const { user, login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: user.name, email: user.email });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/auth/profile", form);
      login(res.data);
      setMessage("Profile updated successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        <h3>Profile</h3>
        {message && <Alert>{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
          </Form.Group>
          <Button type="submit">Update Profile</Button>
        </Form>
      </Card>
    </Container>
  );
}
