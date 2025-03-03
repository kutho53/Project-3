const { Schema, model } = require('mongoose');

//TODO: add the types and reqirements for hours
//TODO: defer to data in database
const hourSchema = new Schema(
    {
        startDate: {type: Date},
        endDate: {type: Date},
        loggedTime: {type: Number},
        status: {type: String},
        _id: {type: String}
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

const Hour = model('Hour', hourSchema);

module.exports = Hour;