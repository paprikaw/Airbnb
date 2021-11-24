import * as React from 'react';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, Card, Popover, Button } from '@mui/material';
import StarRating from 'react-svg-star-rating';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ListedItem ({ title = 'No Title', propertyType = 'No Type', nBath = 0, thumbNail = 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6', rating = 0, nReviews = 0, price = 'unset' }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
                  <Button>Edit</Button>
                  <Button>Edit</Button>
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
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>
                haha
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
