import { Schema, type Document } from 'mongoose';

interface IHour extends Document {
    startDate: String;
    endDate: String;
    loggedTime: Number;
    status: String
}

const hourSchema = new Schema<IHour>({
    startDate: {
        type: String,
        required: false,
    },
    endDate: {
        type: String,
        required: false,
    },
    loggedTime: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
});

export default hourSchema;