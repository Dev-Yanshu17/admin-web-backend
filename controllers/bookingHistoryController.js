const Booking = require("../models/booking");
const BookingHistory = require("../models/bookingHistory");
const Lily = require("../models/home");
const mongoose = require("mongoose");

/* ================= ADD PAYMENT ================= */
exports.addPayment = async (req, res) => {
  try {
    const {
      bookingId,
      amountReceived,
      paymentMethod,
      paymentDetails,
      paymentReceivedDate,
    } = req.body;

    if (!bookingId || !amountReceived || !paymentMethod || !paymentReceivedDate) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid Booking ID" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const project = await Lily.findOne({ id: booking.projectId });
    if (!project) {
      return res.status(400).json({ message: "Project not found" });
    }

    let history = await BookingHistory.findOne({ bookingId });

    /* ================= FIRST TIME CREATE ================= */
    if (!history) {
      history = new BookingHistory({
        bookingId,
        projectName: project.projectName,
        customerName: booking.customerName,
        houseNumber: booking.houseNumber,
        totalAmount: booking.totalAmount,
        advancePayment: booking.advancePayment,
        pendingAmount: booking.totalAmount - booking.advancePayment,
        payments: [],
      });
        
      // Add advance payment as first entry
      if (booking.advancePayment > 0) {
        history.payments.push({
          amountReceived: booking.advancePayment,
          paymentMethod: "advance",
          paymentDetails: {},
          paymentReceivedDate: booking.createdAt,
        });
      }

      await history.save();
      console.log("HISTORY CREATED:", history);
    }

    /* ================= CHECK PENDING ================= */
    if (amountReceived > history.pendingAmount) {
      return res.status(400).json({
        message: "Amount exceeds pending payment",
      });
    }

    /* ================= ADD PAYMENT TO ARRAY ================= */
    history.payments.push({
      amountReceived,
      paymentMethod,
      paymentDetails,
      paymentReceivedDate,
    });

    /* ================= UPDATE PENDING ================= */
    history.pendingAmount =
      history.pendingAmount - amountReceived < 0
        ? 0
        : history.pendingAmount - amountReceived;

    /* ================= ALSO UPDATE BOOKING ================= */
    booking.pendingAmount = history.pendingAmount;

    await booking.save();
    await history.save();

    res.status(201).json({
      message: "Payment added successfully",
      data: history,
    });
    console.log("PAYMENT ADDED:",BookingHistory);
  } catch (error) {
    console.error("ADD PAYMENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET PAYMENT HISTORY ================= */
exports.getPaymentHistory = async (req, res) => {
  try {
    const { bookingId } = req.query;

    if (!bookingId) {
      return res.status(400).json({ message: "Booking ID required" });
    }

    const history = await BookingHistory.findOne({ bookingId });

    res.json({ data: history || null });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET BOOKING BY ID ================= */
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Booking ID" });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    console.log("BOOKING FOUND:", booking);

    res.json({ data: booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};