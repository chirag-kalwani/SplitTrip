import mongoose from "mongoose";

const linkTripSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "trips",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    isOwner: {
        type: Boolean,
        default: false,
    },
});

const LinkTrip = mongoose.models.linkTrips || mongoose.model('linkTrips', linkTripSchema);

export default LinkTrip;
