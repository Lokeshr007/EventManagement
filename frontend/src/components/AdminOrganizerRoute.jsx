import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AdminOrganizerRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user && (user.role === "organizer" || user.role === "admin") ? children : <Navigate to="/" />;
}