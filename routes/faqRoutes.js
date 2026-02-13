const express = require("express");
const router = express.Router();
const Faq = require("../models/Faq");

/* GET all FAQs */
router.get("/", async (req, res) => {
  const faqs = await Faq.find().sort({ createdAt: -1 });
  res.json(faqs);
});

/* ADD FAQ */
router.post("/", async (req, res) => {
  const faq = new Faq(req.body);
  await faq.save();
  res.json(faq);
});

/* UPDATE FAQ */
router.put("/:id", async (req, res) => {
  const updated = await Faq.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

/* DELETE FAQ */
router.delete("/:id", async (req, res) => {
  await Faq.findByIdAndDelete(req.params.id);
  res.json({ message: "FAQ deleted" });
});

module.exports = router;
