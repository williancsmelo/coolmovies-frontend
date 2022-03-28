import React, { useEffect } from 'react'
import { TextField, Autocomplete } from '@mui/material'
import { formStyles } from '../../styles'
import { useAppDispatch, useAppSelector, usersActions } from '../../redux'
import { SerializedStyles } from '@emotion/react'

type UserSelectorProps = {
  onChange: (value: { id: string; name: string } | null) => void
  value: any
  styles?: SerializedStyles
}

const UserSelector = ({ onChange, styles, value }: UserSelectorProps) => {
  const dispatch = useAppDispatch()
  const { listUsers } = useAppSelector(state => state.users)
  useEffect(() => {
    dispatch(usersActions.fetch())
  }, [])
  return (
    <Autocomplete
      disablePortal
      onChange={(_, value) => onChange(value)}
      getOptionLabel={option => option.name}
      options={listUsers}
      value={value}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={params => (
        <TextField
          {...params}
          label="User"
          color="secondary"
          required
          css={[formStyles.textField, styles]}
        />
      )}
    />
  )
}

export default UserSelector
