import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  IconButton
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import getRating from '../elements-renderer/Rating'
import { css } from '@emotion/react'

type ReviewCardProps = {
  review: MovieReview
  onEdit: (review: MovieReview) => void
  onDelete: (id: string) => void
}

const imageSize = 30
const cardSize = 1024

const ReviewCard = ({
  review,
  onEdit,
  onDelete
}: ReviewCardProps): JSX.Element => (
  <Card sx={{ maxWidth: cardSize }} css={styles.card}>
    <Grid container>
      <Grid item xs={12} sm={4} md={3} lg={3} css={styles.imageContainer}>
        <CardMedia
          component="img"
          css={styles.image}
          image={review.movie.imgUrl}
          alt={review.movie.title}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={9} lg={9}>
        <CardHeader
          title={review.title}
          subheader={
            <div css={{ flexDirection: 'column', display: 'flex' }}>
              {getRating(review.rating)}
              {review.user.name}
            </div>
          }
          action={
            <>
              <IconButton aria-label="edit" onClick={() => onEdit(review)}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="edit" onClick={() => onDelete(review.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }
        />
        <CardContent>
          <Typography variant="subtitle1">{review.movie.title}</Typography>
          <Typography variant="subtitle2">
            Director: {review.movie.director.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {review.body}
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  </Card>
)

const styles = {
  image: css({
    maxWidth: `${imageSize * 9}px`,
    maxHeight: `${imageSize * 16}px`,
    alignSelf: 'center'
  }),
  card: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '20px'
  }),
  imageContainer: css({
    display: 'flex',
    justifyContent: 'center'
  })
}

export default ReviewCard
