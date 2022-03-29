import { gql } from '@apollo/client'
import { graphql } from '@apollo/client/react/hoc'

export const loadReviewsQuery = gql`
  query AllMovieReviews($offset: Int!, $limit: Int!) {
    allMovieReviews(offset: $offset, first: $limit) {
      nodes {
        id
        body
        title
        rating
        movie: movieByMovieId {
          imgUrl
          title
          releaseDate
          id
          director: movieDirectorByMovieDirectorId {
            name
            id
          }
        }
        user: userByUserReviewerId {
          id
          name
        }
      }
    }
  }
`

export const loadTotalCount = gql`
  query countRegistry {
    allMovieReviews {
      totalCount
    }
  }
`

export const updateReview = gql`
  mutation updateReview(
    $id: UUID!
    $body: String!
    $movieId: UUID!
    $rating: Int!
    $title: String!
  ) {
    updateMovieReviewById(
      input: {
        movieReviewPatch: {
          body: $body
          movieId: $movieId
          rating: $rating
          title: $title
        }
        id: $id
      }
    ) {
      clientMutationId
      movieReview {
        id
      }
    }
  }
`

export const createReview = gql`
  mutation createReview(
    $body: String!
    $movieId: UUID!
    $rating: Int!
    $title: String!
    $userId: UUID!
  ) {
    createMovieReview(
      input: {
        movieReview: {
          title: $title
          movieId: $movieId
          userReviewerId: $userId
          body: $body
          rating: $rating
        }
      }
    ) {
      clientMutationId
    }
  }
`

export const deleteReview = gql`
  mutation deleteReview($reviewId: UUID!) {
    deleteMovieReviewById(input: { id: $reviewId }) {
      clientMutationId
      deletedMovieReviewId
    }
  }
`
