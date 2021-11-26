/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { Box } from '@mui/system';
import { useParams } from 'react-router';
import fetchPost from '../../utils/fetchPost';
import StarRating from 'react-svg-star-rating';
import { Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ListingDetails () {
  const { listingId } = useParams();
  const [listDetails, setListDetails] = React.useState({});
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    fetchPost('GET', `/listings/${listingId}`, null, null)
      .then(Result => {
        console.log(Result);
        setListDetails(Result.listing);
        setIsReady(true);
      })
  }, [])

  return (
    <React.Fragment>
      { isReady &&
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            {listDetails.title}
          </Typography>
          <Carousel>
            {listDetails.metadata.imageList && listDetails.metadata.imageList.map((image, index) => {
              return (
                <div key={index}>
                  <img src={image} />
                </div>
              )
            })}
          </Carousel>
          <Typography variant="body2" gutterBottom>
            {`${listDetails.address.street}, ${listDetails.address.state}, ${listDetails.address.city}, ${listDetails.address.country}`}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`Amenities: ${listDetails.metadata.amenity}`}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`Price: ${listDetails.price}`}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`Number of bedrooms: ${listDetails.metadata.rooms && listDetails.metadata.rooms.length}`}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`Number of beds: ${listDetails.metadata.rooms && listDetails.metadata.rooms.reduce((sum, room) => sum + parseInt(room.nBeds, 10), 0)}`}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`Number of Bathrooms: ${listDetails.metadata && listDetails.metadata.nBath}`}
          </Typography>
          <StarRating isReadOnly size={15} initialRating={3} unit="float" />
        </React.Fragment>
      }
    </React.Fragment>
  )
}
