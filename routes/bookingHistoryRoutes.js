const express = require("express");
const router = express.Router();
const {
  addPayment,
  getPaymentHistory,
  getBookingById,
} = require("../controllers/bookingHistoryController");

/* Add payment */
router.post("/add-payment", addPayment);

/* Get payment history (single record with array) */
router.get("/", getPaymentHistory);

/* Get booking */
router.get("/:id", getBookingById);

module.exports = router;