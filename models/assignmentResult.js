import mongoose from "mongoose";

const AssignmentResultSchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        gitHubLink: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('AssignmetResult', AssignmentResultSchema);