// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type Client {
        _id: ID
        first_name: String
        last_name: String
        email: String
        phoneNumber: String
    }
    type Query {
        clients: [Client]
        client(id:ID!): Client
    }
`;

// export the typeDefs
module.exports = typeDefs;