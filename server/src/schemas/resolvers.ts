import { User } from "../models/index.js";
//moved interfaces into seperate file 
import * as Interfaces from "./interfaces.js"

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },

    me: async (_parent: unknown, { _id }: Interfaces.UserArgs) => {
      return await User.findOne({ _id: _id }).populate('clients');
    },
  },

  //https://www.mongodb.com/docs/manual/reference/operator as reference
  Mutation: {
    login: async (_parent: unknown, { _id }: Interfaces.UserArgs) => {
      return await User.findOne({ _id: _id });
    },
    addUser: async (_parent: unknown, { input }: Interfaces.AddUserArgs) => {
      return await User.create({ ...input });
    },
    addClient: async (_parent: unknown, { input }: Interfaces.AddClientArgs) => {
      return await User.findOneAndUpdate(
        //searches for the User by user_id
        { _id: input.user_id },
        // uses $addToSet from MongoDB to add new client into clients array
        {
          $addToSet: { clients: input.client },
        },
        //returns the updated User
        {
          new: true,
          runValidators: true,
        }
      );
    },
    updateClient: async (_parent: unknown, { input }: Interfaces.AddClientArgs) => {
      return await User.findOneAndUpdate(
        //searches for the user by user_id and the specific client we want to update by client_id
        { _id: input.user_id, "clients._id":input.client_id },
        //uses MongoDB $set to replace that specifc objects fields without creating new _id and resetting hours[]
        {
          $set: { 
            "clients.$.firstName": input.client.firstName,
            "clients.$.lastName": input.client.lastName,
            "clients.$.buisnessName": input.client.buisnessName,
            "clients.$.phoneNumber": input.client.phoneNumber,
            "clients.$.email": input.client.email,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    addHour: async (_parent: unknown, { input }: Interfaces.AddHourArgs) => {
      return await User.findOneAndUpdate(
        //uses the $elemMatch from mongoDB to find the client object 
        //same as above but different way to find object 
        { _id: input.user_id, clients:{$elemMatch:{_id: input.client_id}} },
        //'client.$.hours says to add the input into the hours[] for the client object we found 
        {
          $push: { 'clients.$.hours': input.hour },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeClient: async (_parent: unknown, { input }: Interfaces.DeleteArgs) => {
      return await User.findOneAndUpdate(
        { _id: input.user_id },
        //uses the mongoDB $pull to remove the client
        { $pull: { clients: {_id: input.client_id} } },
        { new: true }
      );
    },
    removeHour: async (_parent: unknown, { input }: Interfaces.DeleteArgs) => {
      return await User.findOneAndUpdate(
        { _id: input.user_id, clients:{$elemMatch:{_id: input.client_id}} },
        //uses the mongoDB $pull to remove the hour object by the hour_id from clients[{}]
        {
          $pull: { 'clients.$.hours': {_id: input.hour_id} },
        },
        {
          new: true,
        }
      );
    },
    removeAllHours: async (_parent: unknown, { input }: Interfaces.DeleteArgs) => {
      return await User.findOneAndUpdate(
        { _id: input.user_id, clients:{$elemMatch:{_id: input.client_id}} },
        //removes all the hours in the hour array by using $set to reset the array to empty
        {
          $set: { 'clients.$.hours': [] },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
  },
};

export default resolvers;
