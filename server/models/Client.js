const { Schema, model } = require('mongoose');

const clientSchema = new Schema(
    {
      firstName: {type: String},
      lastName: {type: String},
      email: {type: String},
      phoneNumber: {type: String},
      
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

const Client = model('Client', clientSchema);

module.exports = Client;