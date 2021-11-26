/* eslint-disable react/prop-types */
import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Grid, Card } from '@mui/material';
import StarRating from 'react-svg-star-rating';
import { useNavigate } from 'react-router';
import ChanableButton from '../Buttons/ChanableButton';

export default function ListingItem ({ listingId = -1, title = 'No Title', propertyType = 'No Type', nBath = 0, thumbNail = 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6', rating = 0, nReviews = 0, price = 'unset' }) {
  const navigate = useNavigate();
  const handleDetailButton = () => {
    listingId !== -1 && navigate(`/details/${listingId}`);
  }
  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4} lg={3} >
        <Card sx={{ margin: 'auto', maxWidth: 270 }}>
          <CardHeader
            title={title}
            subheader={propertyType}
          />
          <CardMedia
            component="img"
            height="150"
            image={thumbNail}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {`Bedrooms: ${nBath}`}
            </Typography>
            <StarRating isReadOnly size={15} initialRating={rating} unit="float" />
            <Typography variant="body2" color="text.secondary">
              {nReviews} ratings
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {price}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ChanableButton name='UnpublishButton' variant='contained' onClick={handleDetailButton} innerText={'Details'}/>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
