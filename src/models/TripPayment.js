import mongoose from "mongoose";

const tripPaymentSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trips',
    },
    payerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    amount: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

const TripPayment = mongoose.models.trippayments || mongoose.model('trippayments', tripPaymentSchema);

export default TripPayment;