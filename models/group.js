import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        students: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User',
            }
        ],
        shedule: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shedule',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Group', GroupSchema);