/* eslint-disable react/prop-types */
import * as React from 'react';
import { Grid } from '@mui/material';
export default function HostedListing (props) {
  return (
    <div>
      <Grid container spacing={2}>
        {props.children}
      </Grid >
    </div>
  );
}
