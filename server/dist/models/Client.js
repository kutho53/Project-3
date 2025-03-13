import { Schema } from 'mongoose';
import hourSchema from './Hour.js';
const clientSchema = new Schema({
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
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    hours: [hourSchema]
});
export default clientSchema;
//# sourceMappingURL=Client.js.map