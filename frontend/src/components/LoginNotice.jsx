import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginNotice ({ innerText = 'You have not login, please' }) {
  return (
    <div>
      <Typography>
        {innerText}
        <Link to='/login'>Login</Link>
      </Typography>
    </div>
  )
}
