const { Schema, model } = require('mongoose');
const hourSchema = require('./Hours');

const clientSchema = new Schema(
    {
      _id: {type: String},
      firstName: {type: String},
      lastName: {type: String},
      email: {type: String},
      phoneNumber: {type: String},
      hours: [hourSchema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

const Client = model('Client', clientSchema);

module.exports = Client;