import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        dueDate: Date,
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
            required: true,
        },
        results: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AssignmentResult'
        }]
    },
    {
        timestamps: true,
    },
);


export default mongoose.model('Assignment', AssignmentSchema);