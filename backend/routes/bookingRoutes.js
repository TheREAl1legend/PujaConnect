import express from "express";
import {
  createBooking,
  getBookings,
  updateBookingStatus
} from "../controllers/bookingController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createBooking);
router.get("/my-bookings", verifyToken, getBookings);
router.get("/pandit-requests", verifyToken, getBookings);
router.patch("/:id/cancel", verifyToken, updateBookingStatus);
router.patch("/:id/status", verifyToken, roleMiddleware("pandit"), updateBookingStatus);

export default router;