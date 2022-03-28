import { gql } from '@apollo/client'

export const loadUsersQuery = gql`
  query getListUsers {
    allUsers {
      nodes {
        id
        name
      }
    }
  }
`
