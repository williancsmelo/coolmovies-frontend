export const getRating = (rating: number, maxRating: number) => {
  if (rating < 0 || rating > maxRating) {
    throw new Error('Invalid rating')
  }
  return new Array(maxRating)
    .fill(true, 0, rating)
    .fill(false, rating, maxRating)
}
