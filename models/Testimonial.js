const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    designation: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
