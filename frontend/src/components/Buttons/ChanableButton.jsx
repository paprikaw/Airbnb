import React from 'react'
import { Button } from '@mui/material'
// eslint-disable-next-line react/prop-types
export default function ChanableButton ({ innerText = 'Click me', variant = 'contained', onClick }) {
  return (
      <Button variant={variant} onClick={onClick}>
          {innerText}
      </Button>
  )
}
