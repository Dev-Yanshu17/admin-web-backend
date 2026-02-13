const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");

/* ================= ADD TESTIMONIAL ================= */
router.post("/add", async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json({
      success: true,
      message: "Testimonial added successfully",
      data: testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add testimonial",
      error: error.message
    });
  }
});

/* ================= GET ALL TESTIMONIALS ================= */
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials"
    });
  }
});

module.exports = router;
