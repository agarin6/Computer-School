import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
    {
        adress: {
            type: String,
            required: true,
        },
        roomNumber: {
            type: Number,
            required: true,
        }
    }
);

export default mongoose.model('Location', LocationSchema);