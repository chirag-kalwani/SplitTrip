import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    LinkTripIdPayer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "linkTrips",
    },
    LinkTripIdPayee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "linkTrips",
    },
});

const Transaction = mongoose.models.transactions || mongoose.model('transactions', transactionSchema);

export default Transaction;