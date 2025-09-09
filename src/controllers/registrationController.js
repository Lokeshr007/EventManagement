import Registration from "../models/Registration.js";
import Event from "../models/Event.js";

// Register for an event
export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Prevent duplicate registration
    const existing = await Registration.findOne({ event: eventId, user: req.user.id });
    if (existing) return res.status(400).json({ message: "Already registered for this event" });

    const registration = await Registration.create({
      event: eventId,
      user: req.user.id
    });

    res.status(201).json({ message: "Registered successfully", registration });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get my registrations (user)
export const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id }).populate("event");
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Cancel registration
export const cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findOne({
      event: req.params.eventId,
      user: req.user.id
    });
    if (!registration) return res.status(404).json({ message: "Registration not found" });

    registration.status = "cancelled";
    await registration.save();

    res.json({ message: "Registration cancelled", registration });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all registrations for an event (organizer only)
export const getEventRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ event: req.params.eventId })
      .populate("user", "name email");
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
