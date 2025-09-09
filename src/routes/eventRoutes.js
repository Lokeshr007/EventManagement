import express from "express";
import {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  registerEvent,
  getParticipants
} from "../controllers/eventController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { getMyEvents } from "../controllers/eventController.js";


const router = express.Router();

// Public
router.get("/", getAllEvents);
router.get("/:id", getEvent);

// Protected
router.post("/", protect, authorize("organizer", "admin"), createEvent);
router.put("/:id", protect, authorize("organizer", "admin"), updateEvent);
router.delete("/:id", protect, authorize("organizer", "admin"), deleteEvent);

// Register for event (User/Admin/Organizer)
router.post("/:id/register", protect, authorize("user", "organizer", "admin"), registerEvent);
router.get("/my", protect, getMyEvents);

// Get participants (Organizer/Admin)
router.get("/:id/participants", protect, authorize("organizer", "admin"), getParticipants);

export default router;
