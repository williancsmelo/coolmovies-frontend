import { gql } from '@apollo/client'

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
      totalCount
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
      movieReview {
        id
        body
        movie: movieByMovieId {
          id
          imgUrl
          director: movieDirectorByMovieDirectorId {
            id
            name
          }
          releaseDate
          title
        }
        rating
        title
        user: userByUserReviewerId {
          id
          name
        }
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
      movieReview {
        id
        body
        movie: movieByMovieId {
          id
          imgUrl
          director: movieDirectorByMovieDirectorId {
            id
            name
          }
          releaseDate
          title
        }
        rating
        title
        user: userByUserReviewerId {
          id
          name
        }
      }
    }
  }
`

export const deleteReview = gql`
  mutation deleteReview($reviewId: UUID!) {
    deleteMovieReviewById(input: { id: $reviewId }) {
      movieReview {
        id
      }
    }
  }
`
