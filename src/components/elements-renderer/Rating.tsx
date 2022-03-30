import React from 'react'
import StarIcon from '@mui/icons-material/Star'
import { useTheme } from '@mui/material'
import { getRating } from '../helpers/rating'

const RenderRating = (rating: number, maxRating = 5): JSX.Element => {
  const { palette } = useTheme()
  const arrayRating = getRating(rating, maxRating)
  const toRender = arrayRating.map((r, i) => (
    <StarIcon
      key={`${i}`}
      sx={{ color: r ? palette.primary.main : '' }}
      color={!r ? 'disabled' : 'inherit'}
    />
  ))
  return <div>{toRender}</div>
}

export default RenderRating
