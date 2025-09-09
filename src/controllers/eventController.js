import Event from "../models/Event.js";

// Create Event (Organizer/Admin)
export const createEvent = async (req, res) => {
  try {
    const { title, description, location, category, date, capacity } = req.body;

    const event = await Event.create({
      title,
      description,
      location,
      category,
      date,
      capacity,
      organizer: req.user._id
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Events with optional search
export const getAllEvents = async (req, res) => {
  try {
    const search = req.query.search || "";
    const events = await Event.find({
      title: { $regex: search, $options: "i" }
    }).populate("organizer", "name email");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Event
export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("organizer", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Event (Organizer/Admin)
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Only organizer or admin can update
    if (req.user.role !== "admin" && event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    Object.assign(event, req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (req.user.role !== "admin" && event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await event.remove();
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register for Event
export const registerEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.participants.includes(req.user._id)) {
      return res.status(400).json({ message: "Already registered" });
    }

    event.participants.push(req.user._id);
    await event.save();

    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Participants for an Event (Organizer/Admin)
export const getParticipants = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("participants", "name email role");
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Only organizer or admin can view participants
    if (req.user.role !== "admin" && event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(event.participants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};