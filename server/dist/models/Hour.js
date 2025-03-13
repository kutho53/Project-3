import { Schema } from 'mongoose';
const hourSchema = new Schema({
    startDate: {
        type: String,
        required: false,
    },
    endDate: {
        type: String,
        required: false,
    },
    loggedTime: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
});
export default hourSchema;
//# sourceMappingURL=Hour.js.map