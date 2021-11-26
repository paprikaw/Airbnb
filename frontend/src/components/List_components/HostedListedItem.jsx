/* eslint-disable react/prop-types */
import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, Card, Popover, Button } from '@mui/material';
import StarRating from 'react-svg-star-rating';
import { useNavigate } from 'react-router';
import PublishListModal from '../PublishListModal';
import ChanableButton from '../Buttons/ChanableButton';
import fetchPost from '../../utils/fetchPost';
import { StoreContext } from '../../utils/store';

export default function HostedListedItem ({ listingId = -1, title = 'No Title', propertyType = 'No Type', nBath = 0, thumbNail = 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6', rating = 0, nReviews = 0, price = 'unset', isPublished = false }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const context = React.useContext(StoreContext);
  const token = context.token[0];
  const [published, setPublished] = React.useState(isPublished);

  const handleClickEdit = () => {
    listingId !== -1 && navigate(`/EditList/${listingId}`);
  }
  const handleUnPublish = () => {
    fetchPost('PUT', `/listings/unpublish/${listingId}`, null, token)
      .then(() => {})
      .catch(err => alert(err));
    setPublished(false);
  }

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4} lg={3} >
        <Card sx={{ margin: 'auto', maxWidth: 270 }}>
          <CardHeader
            action={
              <React.Fragment>
                <IconButton aria-label="settings" onClick={handlePopoverClick}>
                  <MoreVertIcon />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <div>
                    <Button onClick={ handleClickEdit }>Edit</Button>
                  </div>
                </Popover>
              </React.Fragment>
            }
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
            { published &&
            <React.Fragment>
              <Typography variant="body2" color="text.secondary">
                Status: Published
              </Typography>
            </React.Fragment>
            }
            { !published &&
            <React.Fragment>
              <Typography variant="body2" color="text.secondary">
                Status: Inactive
              </Typography>
            </React.Fragment>
            }
          </CardContent>
          <CardActions disableSpacing>
            { !published &&
              <PublishListModal data-test-target='PublishListModal' text listingId={listingId} func={setPublished}/>
            }
            { published &&
            <React.Fragment>
              <ChanableButton name='UnpublishButton' variant='contained' onClick={handleUnPublish} innerText={'UnPublish'}/>
            </React.Fragment>
            }
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
