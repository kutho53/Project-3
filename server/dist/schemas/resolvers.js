//import  { User }  from "../models/index.js";
import User from '../models/User_me.js';
import { AuthenticationError, signToken } from "../utils/auth.js";
const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        me: async (_parent, { _id }, context) => {
            if (context.user) {
                return await User.findOne({ _id: _id }).populate('clients');
            }
            throw AuthenticationError;
        },
    },
    //https://www.mongodb.com/docs/manual/reference/operator as reference
    Mutation: {
        login: async (_parent, { input }) => {
            const user = await User.findOne({ userName: input.userName });
            if (!user) {
                throw AuthenticationError;
            }
            const correctPW = await user.isCorrectPassword(input.password);
            console.log(correctPW);
            if (!correctPW) {
                // If password is incorrect, throw an authentication error
                throw new AuthenticationError('Not Authenticated');
            }
            const token = signToken(user.userName, user.email, user._id);
            return { token, user };
        },
        addUser: async (_parent, { input }) => {
            const user = await User.create({ ...input });
            const token = signToken(user.userName, user.email, user._id);
            return { token, user };
        },
        addClient: async (_parent, { input }, context) => {
            if (context.user) {
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
                });
            }
            throw AuthenticationError;
        },
        updateClient: async (_parent, { input }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                //searches for the user by user_id and the specific client we want to update by client_id
                { _id: input.user_id, "clients._id": input.client_id }, 
                //uses MongoDB $set to replace that specifc objects fields without creating new _id and resetting hours[]
                {
                    $set: {
                        "clients.$.firstName": input.client.firstName,
                        "clients.$.lastName": input.client.lastName,
                        "clients.$.buisnessName": input.client.buisnessName,
                        "clients.$.phoneNumber": input.client.phoneNumber,
                        "clients.$.email": input.client.email,
                    },
                }, {
                    new: true,
                    runValidators: true,
                });
            }
            throw AuthenticationError;
        },
        addHour: async (_parent, { input }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                //uses the $elemMatch from mongoDB to find the client object 
                //same as above but different way to find object 
                { _id: input.user_id, clients: { $elemMatch: { _id: input.client_id } } }, 
                //'client.$.hours says to add the input into the hours[] for the client object we found 
                {
                    $push: { 'clients.$.hours': input.hour },
                }, {
                    new: true,
                    runValidators: true,
                });
            }
            throw AuthenticationError;
        },
        removeClient: async (_parent, { input }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate({ _id: input.user_id }, 
                //uses the mongoDB $pull to remove the client
                { $pull: { clients: { _id: input.client_id } } }, { new: true });
            }
            throw AuthenticationError;
        },
        removeHour: async (_parent, { input }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate({ _id: input.user_id, clients: { $elemMatch: { _id: input.client_id } } }, 
                //uses the mongoDB $pull to remove the hour object by the hour_id from clients[{}]
                {
                    $pull: { 'clients.$.hours': { _id: input.hour_id } },
                }, {
                    new: true,
                });
            }
            throw AuthenticationError;
        },
        removeAllHours: async (_parent, { input }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate({ _id: input.user_id, clients: { $elemMatch: { _id: input.client_id } } }, 
                //removes all the hours in the hour array by using $set to reset the array to empty
                {
                    $set: { 'clients.$.hours': [] },
                }, {
                    new: true,
                    runValidators: true,
                });
            }
            throw AuthenticationError;
        },
    },
};
export default resolvers;
//# sourceMappingURL=resolvers.js.map