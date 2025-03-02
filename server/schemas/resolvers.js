const database = require('../connect');
const { Client } = require('../models');

const resolvers = {
    Query: {
        client: async (id) => {
            let base = database.getDb();
            const data = await base.collection('client');
            return await data.findOne({id});
        },
        clients: async () => {
            let base = database.getDb();
            const data = await base.collection('client').find({}).toArray();
            return data;
        }
    }
  };
  
  module.exports = resolvers;