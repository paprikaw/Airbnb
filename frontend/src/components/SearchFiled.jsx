// src/components/Search.js

import React, { useState } from 'react';
import { Grid, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchField ({ listingInfos = [] }) {
  // eslint-disable-next-line no-unused-vars
  const setSearchField = useState('')[1];
  const handleChange = e => {
    setSearchField(e.target.value);
  };
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={6}>
          <TextField variant='outlined' label="Search your listings" onChange={handleChange}>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <IconButton >
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>

    </React.Fragment>
  );
}

export default SearchField;
