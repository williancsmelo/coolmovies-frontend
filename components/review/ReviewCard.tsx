import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography
} from '@mui/material'
import review from '../../staticData'
import getRating from '../elements-render/Rating'
import { useTheme } from '@mui/material'

type ReviewCardProps = {
  review: MovieReview
}

const ReviewCard = (/*{ review }: ReviewCardProps*/): JSX.Element => (
  <Card sx={{ maxWidth: 900 }}>
    <CardHeader
      title={review.title}
      subheader={
        <div css={{ flexDirection: 'column', display: 'flex' }}>
          {getRating(review.rating)}
          {review.user.name}
        </div>
      }
    />
    <CardMedia
      component="img"
      height="505"
      image={review.movie.imgUrl}
      alt={review.movie.title}
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
  </Card>
)

export default ReviewCard
