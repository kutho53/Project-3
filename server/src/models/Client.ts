import { Schema, type Document } from 'mongoose';
import hourSchema from './Hour.js';

interface IClient extends Document {
    firstName: string;
    lastName: string;
    buisnessName: string;
    phoneNumber: string;
    email: string;
    hours: [];
}

const clientSchema = new Schema<IClient>({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    buisnessName: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    hours: [hourSchema]
});

export default clientSchema;