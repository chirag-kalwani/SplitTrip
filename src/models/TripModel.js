import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    tripName: {
        type: String,
        required: [true, "Please Provide Trip Name"],
        unique: true,
    },
    tripDescription: {
        type: String,
        required: [true, "Please Provide Trip Desription"],
    },
    tripLocation: {
        type: String,
        required: [true, "Please Provide Trip Location"],
    },
});

const Trip = mongoose.models.trips || mongoose.model('trips', tripSchema);

export default Trip;
