const typeDefs = `
  type User {
    _id: ID!
    userName: String
    email: String
    password: String
    clients: [Client]
  }
  
  type Auth {
    token: ID!
    user: User
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
    _id: ID!
    startDate: String
    endDate: String
    loggedTime: String
    status: String
  }
  
  input UserInput {
    userName: String
    email: String
    password: String
  }

  input LoginInput {
    userName: String!
    password: String!
  }

  input IClient {
    firstName: String
    lastName: String
    buisnessName: String
    phoneNumber: String
    email: String
  }

  input ClientInput {
    user_id: String
    client_id: String
    client: IClient
  }

  input IHour {
    startDate: String
    endDate: String
    loggedTime: String
    status: String
  }

  input HourInput {
    user_id: String
    client_id: String
    hour: IHour
  }

  input DeleteInput {
    user_id: String
    client_id: String
    hour_id: String
  }

  type Query {
    users: [User]!
    me(_id: ID!): User
  }

  type Mutation {
    login(input: LoginInput!): Auth
    addUser(input: UserInput ): Auth

    addClient(input: ClientInput): User
    updateClient(input: ClientInput): User
    removeClient(input: DeleteInput): User
    addHour(input: HourInput): User
    removeHour(input: DeleteInput): User
    removeAllHours(input: DeleteInput): User
  }
 
`;
export default typeDefs;
//# sourceMappingURL=typeDefs.js.map