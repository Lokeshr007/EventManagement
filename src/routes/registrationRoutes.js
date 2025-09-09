import express from "express";
import {
  registerForEvent,
  getMyRegistrations,
  cancelRegistration,
  getEventRegistrations
} from "../controllers/registrationController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/", protect, registerForEvent);
router.get("/me", protect, getMyRegistrations);
router.put("/:eventId/cancel", protect, cancelRegistration);

// Organizer routes
router.get("/:eventId", protect, authorize("organizer", "admin"), getEventRegistrations);

export default router;
