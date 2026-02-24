const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    amountReceived: { type: Number, required: true },

    paymentMethod: {
      type: String,
      enum: ["cash", "upi", "bank", "cheque", "card", "advance"],
      required: true,
    },

    paymentDetails: {
      upiTxnId: String,
      bankName: String,
      transactionId: String,
      chequeNo: String,
      chequeDate: Date,
      cardType: { type: String, enum: ["debit", "credit"] },
      last4Digits: String,
    },

    paymentReceivedDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const BookingHistorySchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true, // 🔥 ONE RECORD PER BOOKING
    },

    projectName: String,
    customerName: String,
    houseNumber: String,

    totalAmount: { type: Number, required: true },
    advancePayment: { type: Number, required: true },

    pendingAmount: { type: Number, required: true },

    payments: [PaymentSchema], // 🔥 ARRAY OF PAYMENTS
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookingHistory", BookingHistorySchema);