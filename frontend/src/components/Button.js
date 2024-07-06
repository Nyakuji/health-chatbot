import React from 'react'
import PropTypes from 'prop-types'
import { Button as MuiButton } from '@mui/material'

const Button = ({ text, onClick, color, variant, ...props }) => {
  return (
    <MuiButton variant={variant} color={color} onClick={onClick} {...props}>
      {text}
    </MuiButton>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  variant: PropTypes.string,
}

Button.defaultProps = {
  color: 'primary',
  variant: 'contained',
}

export default Button
