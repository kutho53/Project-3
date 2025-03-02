const { Schema, model } = require('mongoose');

//add the types and reqirements for User
// defer to data in database

//import and add Client schema 
const userSchema = new Schema(
    {}
);

const User = model('User', userSchema);

module.exports = User;