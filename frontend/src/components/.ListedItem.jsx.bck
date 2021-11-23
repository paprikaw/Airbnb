import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import StarRating from 'react-svg-star-rating'
import { IconButton, Button } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import ClearIcon from '@mui/icons-material/Clear';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ListedItem ({ title, propertyType, nBath, thumbNail = 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6', rating, nReviews, price }) {
  const listItemClickHandler = () => {
    console.log('haha');
  }

  const deleteClickHandler = () => {
    console.log('haha1');
  }
  return (
    <Box
    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
        <Paper sx={{ p: 2, flexGrow: 1, margin: 2, cursor: 'pointer' } } >
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          <Grid container spacing={2}>
            <Grid item >
              <ButtonBase sx={{ width: 100, height: 100 }}>
                <Img alt="complex" src= { `${thumbNail}?w=164&h=164&fit=crop&auto=format` } />
              </ButtonBase>
            </Grid>
            <Grid item xs={ 12 } sm container>
              <Grid item xs container direction="column" spacing={2}onClick={ listItemClickHandler } sx={{ cursor: 'pointer' }}>
                <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" component="div">
                     {title}
                    </Typography>
                    <Typography variant="caption" component="div">
                       {propertyType}
                    </Typography>
                    <Typography variant="caption" component="div">
                       {`Bathrooms: ${nBath}`}
                    </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" component="div">
                     {`${price} $`}
                  </Typography>
                </Grid>
                <Grid item container spacing={1}>
                    <Grid item>
                        <StarRating isReadOnly size={15} initialRating={rating} unit="float" />
                    </Grid>
                    <Grid item>
                        <Typography variant="caption" component="div">
                           {`${nReviews} reviews`}
                        </Typography>
                    </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <IconButton aria-label="delete" onClick={deleteClickHandler}>
                  <ClearIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
    </Box>
  );
}

ListedItem.propTypes = {
  title: PropTypes.string,
  propertyType: PropTypes.string,
  nBath: PropTypes.number,
  thumbNail: PropTypes.string,
  rating: PropTypes.number,
  nReviews: PropTypes.number,
  price: PropTypes.number,
};
