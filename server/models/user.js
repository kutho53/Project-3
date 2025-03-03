const { Schema, model } = require('mongoose');
const clientSchema = require('./Client');


const userSchema = new Schema(
    {
        _id: {type: String},
        userName: {type: String},
        password: {type: String},
        clients: {clientSchema}
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

const User = model('User', userSchema);

module.exports = User;