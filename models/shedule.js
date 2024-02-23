import mongoose from "mongoose";

const SheduleSchema = new mongoose.Schema(
    {
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
            required: true,
        },
        dateTime: {
            type: Date,
            required: true,
        },
        location: {
            ttype: mongoose.Schema.Types.ObjectId,
            ref: 'Location',
            required: true,
        },
    }
    ,
    {
        timestamps: true,
    },
);

export default mongoose.model('Shedule', SheduleSchema);