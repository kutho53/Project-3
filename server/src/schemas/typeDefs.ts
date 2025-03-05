const typeDefs = `
  type User {
    _id: ID!
    userName: String
    password: String
    clients: [Client]
  }
  
  type Client {
    _id: ID!
    firstName: String
    lastName: String
    buisnessName: String
    phoneNumber: String
    email: String
    hours: [Hour]
  }

  type Hour {
    startDate: String
    endDate: String
    loggedTime: Number
    status: String
  }

  type Query {
    users: [User]!
    me(_id: ID!): User
  }

  
`;

export default typeDefs;
