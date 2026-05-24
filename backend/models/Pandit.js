import mongoose from "mongoose";

const panditSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required ❌"],
      unique: true,
    },

    city: {
      type: String,
      trim: true,
      default: "",
      index: true,
    },

    // ✅ Changed from String to Number for sorting/filtering
    experience: {
      type: Number,
      default: 0,
      min: [0, "Experience cannot be negative ❌"],
    },

    // ✅ Added min: 0 to prevent negative prices
    price: {
      type: Number,
      default: 0,
      min: [0, "Price cannot be negative ❌"],
    },

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [1000, "Description cannot exceed 1000 characters ❌"],
    },

    services: [
      {
        type: String,
        trim: true,
      },
    ],

    profileImage: {
      type: String,
      default: "",
    },

    // ✅ New: average rating derived from reviews
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    // ✅ New: total number of bookings completed
    totalBookings: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ✅ New: availability toggle
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
panditSchema.index({ city: 1, isAvailable: 1 });   // city search filter
panditSchema.index({ price: 1 });                   // price sort
panditSchema.index({ rating: -1 });                 // top rated sort
panditSchema.index({ experience: -1 });             // most experienced sort

// ─── Virtual: experience display label ───────────────────────────────────────
// Usage: pandit.experienceLabel → "5 years"
panditSchema.virtual("experienceLabel").get(function () {
  if (this.experience === 0) return "Fresher";
  return `${this.experience} year${this.experience > 1 ? "s" : ""}`;
});

const Pandit = mongoose.model("Pandit", panditSchema);
export default Pandit;