import { gql } from '@apollo/client'

export const loadMoviesQuery = gql`
  query AllMovies {
    allMovies {
      nodes {
        id
        title
      }
    }
  }
`
