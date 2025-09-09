import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminOrganizerRoute from "./components/AdminOrganizerRoute";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Participants from "./pages/Participants";
import NotFound from "./pages/NotFound";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar at top */}
      <Navbar />

      {/* Main content */}
      <main style={{ flex: 1, paddingBottom: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route
            path="/dashboard"
            element={<AdminOrganizerRoute><Dashboard /></AdminOrganizerRoute>}
          />
          <Route
            path="/participants/:eventId"
            element={<AdminOrganizerRoute><Participants /></AdminOrganizerRoute>}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />
          <Route path="/login" element={!user ? <Login /> : <Home />} />
          <Route path="/register" element={!user ? <Register /> : <Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Compact footer */}
      <Footer />
    </div>
  );
}
