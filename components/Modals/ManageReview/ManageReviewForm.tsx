import React, { useState } from 'react'
import { css } from '@emotion/react'
import { TextField, Grid, Rating, useTheme, Button } from '@mui/material'
import { formStyles } from '../../../styles'
import MovieSelector from '../../form-fields/MovieSelector'

type ManageReviewFormProps = {
  action: 'edit' | 'create'
  initialValues?: Partial<MovieReview>
}

const ManageReviewForm = ({
  action,
  initialValues = {}
}: ManageReviewFormProps): JSX.Element => {
  const defaultValues = { title: '', rating: 3, body: '' }
  const [formValues, setFormValues] = useState(
    action === 'edit' ? initialValues : defaultValues
  )
  const { palette } = useTheme()
  const onSubmit = (params: any) => {
    console.log(params)
  }
  const setFieldValue = (value: string | number | null, field: string) => {
    setFormValues({
      ...formValues,
      [field]: value
    })
  }
  return (
    <form onSubmit={onSubmit}>
      <div css={styles.formContainer}>
        <MovieSelector
          onChange={value =>
            setFieldValue(value?.id ? value.id : null, 'movie')
          }
          styles={css`
            width: 100%;
            max-width: 412px;
          `}
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
            type="submit"
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
