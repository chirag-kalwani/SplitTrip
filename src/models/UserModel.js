import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please Provide Username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please Provide Email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please Provide Password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});


const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
