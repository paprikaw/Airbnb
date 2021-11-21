import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginNotice () {
  return (
    <div>
      <Typography>
        {'You have not login, please '}
        <Link to='/'>Login</Link>
      </Typography>
    </div>
  )
}
