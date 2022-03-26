import React from 'react'
import { css } from '@emotion/react'
import { TextField, Grid, Rating, useTheme, Button } from '@mui/material'

type ManageReviewFormProps = {}

const ManageReviewForm = ({}: ManageReviewFormProps): JSX.Element => {
  const { palette } = useTheme()
  return (
    <form>
      <div css={styles.formContainer}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              required
              css={styles.textField}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} css={styles.ratingContainer}>
            <Rating
              name="rating"
              css={{ color: palette.primary.main }}
              size="large"
            />
          </Grid>
        </Grid>
        <TextField
          name="body"
          label="Description"
          multiline
          maxRows={5}
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
  textField: css({
    marginBottom: '10px',
    width: '100%'
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
