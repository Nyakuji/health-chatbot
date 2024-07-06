import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'

const CustomInput = ({ label, ...props }) => {
  return <TextField label={label} {...props} />
}

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
}

export default CustomInput
