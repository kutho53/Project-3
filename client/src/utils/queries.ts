import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query Me($id: ID!) {
        me(_id: $id) {
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