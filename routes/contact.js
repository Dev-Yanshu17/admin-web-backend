const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetch all contacts from DB
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ message: "Your message has been sent successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit form" });
  }
});

module.exports = router;
