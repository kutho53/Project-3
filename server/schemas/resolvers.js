const database = require('../config/connect');
const { Client } = require('../models');

const resolvers = {
    Query: {
        //get user by username
        user: async(parent, args, context) => {
            if (context.user){
                let base = database.getDb();
                const data = await base.collection('users');
                const userData = await data.findOne({ _id: context.user._id})
                    .select('-__v -password')
                    .populate('clients')
                return userData;
            }
            //throw new AuthenticationError('Not Logged In');
        }
    },
    Mutation: {
        //add user

        //login

        //add client

        //add hours

        //delete client

        //delete hours
    }
  };
  
  module.exports = resolvers;