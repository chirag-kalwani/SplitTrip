import mongoose from "mongoose";

const receiverSchema = new mongoose.Schema({
    receiverIds: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    amount: Number
}, {_id: false});

const tripPaymentSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trips',
    },
    payerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    receivers: [receiverSchema],
    amount: {
        type: Number,
    },
}, {timestamps: true});

const TripPayment = mongoose.models.trippayments || mongoose.model('trippayments', tripPaymentSchema);

export default TripPayment;