import React, { useState } from 'react'
import { css } from '@emotion/react'
import { TextField, Grid, Rating, useTheme, Button } from '@mui/material'
import { formStyles } from '../../../styles'
import MovieSelector from '../../form-fields/MovieSelector'

type ManageReviewFormProps = {
  action: 'edit' | 'create'
  initialValues?: Partial<MovieReview>
  onSubmit: any
}

type FormValues = Partial<{
  id: string
  body: string
  title: string
  rating: number
  movie: { id: string; title: string }
}>

const ManageReviewForm = ({
  action,
  initialValues = {},
  onSubmit
}: ManageReviewFormProps): JSX.Element => {
  const { palette } = useTheme()
  const defaultValues = { title: '', rating: 3, body: '' }
  const formatInitialValues = (values: typeof initialValues): FormValues => {
    const { movie } = values
    let newValues: FormValues = {
      id: initialValues.id,
      body: initialValues.body,
      title: initialValues.title,
      rating: initialValues.rating
    }
    if (movie) {
      newValues.movie = {
        id: movie.id,
        title: movie.title
      }
    }
    return newValues
  }
  const [formValues, setFormValues] = useState<FormValues>(
    action === 'edit' ? formatInitialValues(initialValues) : defaultValues
  )
  const setFieldValue = (value: any, field: string) => {
    setFormValues({
      ...formValues,
      [field]: value
    })
  }
  return (
    <form>
      <div css={styles.formContainer}>
        <MovieSelector
          onChange={value => {
            setFieldValue(value, 'movie')
          }}
          styles={css`
            width: 100%;
            max-width: 412px;
          `}
          value={formValues.movie}
        />
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              onChange={({ target: { value } }) =>
                setFieldValue(value, 'title')
              }
              value={formValues.title}
              required
              label="Title"
              variant="outlined"
              css={formStyles.textField}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} css={styles.ratingContainer}>
            <Rating
              onChange={(_, value: number | null) => {
                setFieldValue(value as number, 'rating')
              }}
              value={formValues.rating}
              css={{ color: palette.primary.main }}
              size="large"
            />
          </Grid>
        </Grid>
        <TextField
          onChange={({ target: { value } }) => setFieldValue(value, 'body')}
          value={formValues.body}
          label="Description"
          multiline
          rows={5}
          color="secondary"
        />
        <div css={styles.footer}>
          <Button color="inherit" variant="contained">
            Cancel
          </Button>
          <Button
            variant="contained"
            css={css`
              background: ${palette.primary.main};
              :hover {
                background: ${palette.primary.dark};
              }
            `}
            onClick={() => onSubmit(formValues)}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  )
}

const styles = {
  formContainer: css({
    display: 'flex',
    flexDirection: 'column'
  }),
  ratingContainer: css({
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '10px'
  }),
  footer: css({
    display: 'flex',
    marginTop: '30px',
    justifyContent: 'flex-end',
    button: {
      marginLeft: '20px'
    }
  })
}

export default ManageReviewForm
