import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required ❌"],
    },

    panditId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pandit",
      required: [true, "Pandit ID is required ❌"],
    },

    // ✅ Changed from separate String date + time → single Date field
    // Send from frontend as: new Date("2025-12-25T10:30:00")
    bookedAt: {
      type: Date,
      required: [true, "Booking date and time is required ❌"],
      validate: {
        validator: function (value) {
          return value > new Date(); // must be a future date
        },
        message: "Booking date must be in the future ❌",
      },
    },

    address: {
      type: String,
      required: [true, "Address is required ❌"],
      trim: true,
    },

    phone: {
      type: String,
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits ❌"],
    },

    poojaType: {
      type: String,
      trim: true,
      default: "General Pooja",
    },

    // ✅ New: optional message from user to pandit
    note: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Note cannot exceed 500 characters ❌"],
    },

    status: {
      type: String,
      enum: {
        values: ["pending", "confirmed", "cancelled", "completed"],
        message: "Invalid booking status ❌",
      },
      default: "pending",
    },

    // ✅ New: track who cancelled and why
    cancellationReason: {
      type: String,
      default: "",
    },

    // ✅ New: amount paid (useful for payment integration later)
    amountPaid: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
bookingSchema.index({ userId: 1, status: 1 });        // user's bookings by status
bookingSchema.index({ panditId: 1, status: 1 });      // pandit's bookings by status
bookingSchema.index({ bookedAt: 1 });                 // chronological sort
bookingSchema.index({ panditId: 1, bookedAt: 1 });    // pandit schedule lookup

// ─── Virtual: formatted booking date ─────────────────────────────────────────
// Usage: booking.formattedDate → "25 Dec 2025, 10:30 AM"
bookingSchema.virtual("formattedDate").get(function () {
  if (!this.bookedAt) return "";
  return this.bookedAt.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
});

// ─── Static method: get bookings for a pandit on a specific date ──────────────
// Usage: await Booking.getBookingsForDate(panditId, new Date("2025-12-25"));
bookingSchema.statics.getBookingsForDate = async function (panditId, date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return this.find({
    panditId,
    bookedAt: { $gte: start, $lte: end },
    status: { $ne: "cancelled" },
  });
};

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;