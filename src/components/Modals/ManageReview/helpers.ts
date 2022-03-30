export type FormValues = Partial<{
  id: string
  body: string
  title: string
  rating: number
  movie: Partial<MovieReview> | null
  user?: User | null
}>

export const formatInitialValues = (values: Partial<MovieReview>) => {
  const { movie } = values
  let newValues: FormValues = {
    id: values.id,
    body: values.body,
    title: values.title,
    rating: values.rating
  }
  if (movie) {
    newValues.movie = {
      id: movie.id,
      title: movie.title
    }
  }
  return newValues
}
