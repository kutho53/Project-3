import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation AddUser($input: UserInput) {
        addUser(input: $input) {
            _id
            userName
        }
    }
`;

export const ADD_CLIENT = gql`
    mutation AddClient($input: ClientInput) {
        addClient(input: $input) {
            _id
            userName
            clients {
                _id
                firstName
                lastName
                buisnessName
                email
                phoneNumber
                hours {
                    _id
                    startDate
                    endDate
                    loggedTime
                    status
                }
            }
        }
    }
`;

export const UPDATE_CLIENT = gql`
    mutation UpdateClient($input: ClientInput) {
        updateClient(input: $input) {
            _id
            userName
            clients {
                _id
                firstName
                lastName
                buisnessName
                email
                phoneNumber
                hours {
                    _id
                    startDate
                    endDate
                    loggedTime
                    status
                }
            }
        }
    }
`;

export const REMOVE_CLIENT = gql`
    mutation RemoveClient($input: DeleteInput) {
        removeClient(input: $input) {
            _id
            userName
            clients {
                _id
                firstName
                lastName
                buisnessName
                email
                phoneNumber
                hours {
                    _id
                    startDate
                    endDate
                    loggedTime
                    status
                }
            }
        }
    }
`;

export const ADD_HOUR = gql`
    mutation AddHour($input: HourInput) {
        addHour(input: $input) {
            _id
            userName
            clients {
                _id
                firstName
                lastName
                buisnessName
                email
                phoneNumber
                hours {
                    _id
                    startDate
                    endDate
                    loggedTime
                    status
                }
            }
        }
    }
`;

export const REMOVE_HOUR = gql`
    mutation RemoveHour($input: DeleteInput) {
        removeHour(input: $input) {
            _id
            userName
            clients {
                _id
                firstName
                lastName
                buisnessName
                email
                phoneNumber
                hours {
                    _id
                    startDate
                    endDate
                    loggedTime
                    status
                }
            }
        }
    }
`;

export const REMOVE_ALL_HOURS = gql`
    mutation RemoveAllHours($input: DeleteInput) {
        removeAllHours(input: $input) {
            _id
            userName
            clients {
                _id
                firstName
                lastName
                buisnessName
                email
                phoneNumber
                hours {
                    _id
                    startDate
                    endDate
                    loggedTime
                    status
                }
            }
        }
    }
`;