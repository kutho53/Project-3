// import the gql tagged template function
const { gql } = require('apollo-server-express');

// TODO: create our typeDefs

    // add type user
    // add type hours
    // update query
    // add mutations
    // add auth
const typeDefs = gql`
    type Client {
        _id: ID
        first_name: String
        last_name: String
        email: String
        phoneNumber: String
    }
    type Query {
        
    }
`;

// export the typeDefs
module.exports = typeDefs;