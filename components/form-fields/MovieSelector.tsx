import React, { useEffect } from 'react'
import { TextField, Autocomplete } from '@mui/material'
import { formStyles } from '../../styles'
import { useAppDispatch, useAppSelector, moviesActions } from '../../redux'
import { SerializedStyles } from '@emotion/react'

type MovieSelectorProps = {
  onChange: (value: { id: string; title: string } | null) => void
  styles?: SerializedStyles
}

const MovieSelector = ({ onChange, styles }: MovieSelectorProps) => {
  const dispatch = useAppDispatch()
  const { listMovies } = useAppSelector(state => state.movies)
  useEffect(() => {
    dispatch(moviesActions.fetch())
  }, [])
  return (
    <Autocomplete
      disablePortal
      onChange={(_, value) => onChange(value)}
      getOptionLabel={option => option.title}
      options={listMovies}
      renderInput={params => (
        <TextField
          {...params}
          label="Movie"
          color="secondary"
          required
          css={[formStyles.textField, styles]}
        />
      )}
    />
  )
}

export default MovieSelector
