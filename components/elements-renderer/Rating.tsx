import React from 'react'
import StarIcon from '@mui/icons-material/Star'
import { useTheme } from '@mui/material'

type RenderRatingProps = {
  rating: number
  maxRating: number
}

const RenderRating = (rating: number, maxRating = 5): JSX.Element => {
  const { palette } = useTheme()
  const toRender: JSX.Element[] = []
  for (let i = 0; i < maxRating; i++) {
    const active = i + 1 <= rating
    toRender.push(
      <StarIcon
        key={`${i}`}
        sx={{ color: active ? palette.primary.main : '' }}
        color={!active ? 'disabled' : 'inherit'}
      />
    )
  }
  return <div>{toRender}</div>
}

export default RenderRating
