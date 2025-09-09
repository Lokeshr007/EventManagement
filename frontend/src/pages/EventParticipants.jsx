import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import EventParticipants from "./pages/EventParticipants";


function EventParticipants() {
  const { eventId } = useParams();
  const [participants, setParticipants] = useState([]);

  const fetchParticipants = async () => {
    try {
      const res = await API.get(`/registrations/${eventId}`);
      setParticipants(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Participants</h2>
      {participants.length === 0 ? (
        <p>No participants registered yet.</p>
      ) : (
        <ul className="list-disc pl-5">
          {participants.map((p) => (
            <li key={p._id}>{p.user.name} - {p.user.email}</li>
          ))}
        </ul>
      )}
      <Route path="/events/:eventId/participants" element={<EventParticipants />} />
    </div>
  );
}

export default EventParticipants;
