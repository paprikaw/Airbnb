import * as React from 'react';
import { Grid } from '@mui/material';
import ListedItem from '../components/List_components/ListedItem';

export default function RecipeReviewCard () {
  return (
    <Grid container spacing={2}>
      <ListedItem />
      <ListedItem />
      <ListedItem />
    </Grid >
  );
}
