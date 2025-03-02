const { Schema, model } = require('mongoose');

//add the types and reqirements for hours
// defer to data in database
const hourSchema = new Schema(
    {}
);

const Hour = model('Hour', hourSchema);

module.exports = Hour;