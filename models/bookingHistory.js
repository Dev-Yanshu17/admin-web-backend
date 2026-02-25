const mongoose = require("mongoose");

const BookingHistorySchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      // unique: true, // 🔥 only one document per booking
    },

    customerName: { type: String, required: true },
    houseNumber: { type: String, required: true },

    totalAmount: { type: Number, required: true },
    advancePayment: { type: Number, required: true },
    pendingAmount: { type: Number, required: true },

    payments: [
      {
        amountReceived: { type: Number, required: true },
        paymentMethod: {
          type: String,
          enum: ["cash", "upi", "bank", "cheque", "card", "advance"],
          required: true,
        },
        paymentDetails: Object,
        paymentReceivedDate: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookingHistory", BookingHistorySchema);