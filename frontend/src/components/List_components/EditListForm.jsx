/* eslint-disable react/prop-types */
// Render Prop
import React from 'react';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Typography, MenuItem, InputLabel, FormControl } from '@mui/material';
import fetchPost from '../../utils/fetchPost';
import { StoreContext } from '../../utils/store';
import { updateList } from '../../utils/updateList';
import Select from '@mui/material/Select';
import CreateRoomModal from './CreateRoomModal';
// import RoomPropertyItem from './RoomPropertyItem';
import RoomPropertyItem from './RoomPropertyItem';
import UploadThumbnailButton from '../UploadThumbnailButton';
import UploadImagesButton from '../UploadImagesButton';
import isObjectEmpty from '../../utils/isObjectEmpty';

const EditListForm = ({ listingId }) => {
  const context = React.useContext(StoreContext);
  const token = context.token[0];
  const setList = context.list[1];
  const [roomList, setRoomList] = context.roomList;
  const localImages = context.localImages[0];
  const thumbnail = context.thumbnail[0];
  const setListHead = context.listHead[1];
  const [listingInfos, setListingInfos] = React.useState({});
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    fetchPost('GET', `/listings/${listingId}`, null, null).then((result) => {
      console.log(result, listingId);
      setListingInfos(result.listing);
      setListHead(result.listing.metadata.rooms[result.listing.metadata.rooms.length - 1].idx + 1);
    })
      .catch(err => alert(err));
  }, []);

  React.useEffect(() => {
    console.log(listingInfos);
    if (!isObjectEmpty(listingInfos)) {
      setRoomList(listingInfos.metadata.rooms);
      setIsReady(true);
    }
    // !isObjectEmpty(listingInfos) && setRoomList(listingInfos.metadata.bedRooms) && setIsReady(true);
  }, [listingInfos])

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Editing Listing
      </Typography>
      {isReady &&
        <React.Fragment>
          <Formik
            initialValues={{
              title: listingInfos.title,
              country: listingInfos.address.country,
              city: listingInfos.address.city,
              state: listingInfos.address.state,
              street: listingInfos.address.street,
              price: listingInfos.price,
              type: listingInfos.metadata.type,
              nBath: listingInfos.metadata.nBath,
              amenity: listingInfos.metadata.amenity,
            }}
            onSubmit={(values, { setSubmitting }) => {
              const body = {
                title: values.title,
                address: {
                  country: values.country,
                  city: values.city,
                  state: values.state,
                  street: values.street,
                },
                price: values.price,
                thumbnail: thumbnail,
                metadata: {
                  amenity: values.amenity,
                  nBath: values.nBath,
                  type: values.type,
                  rooms: roomList,
                  imageList: localImages,
                }
              }
              setRoomList([]);
              setListHead([]);
              fetchPost('PUT', `/listings/${listingId}`, body, token)
                .then(_ => {
                  updateList(token, setList);
                })
                .catch(err => {
                  alert(err);
                })
            }}
          >
            {({ handleChange, values }) => (
              <Form>
                <Grid container spacing={3}>
                  <React.Fragment>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        name="title"
                        label="Title of your list"
                        fullWidth
                        autoComplete="cc-name"
                        variant="standard"
                        onChange={ handleChange }
                        defaultValue={ values.title }
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <TextField
                      required
                      name="country"
                      label="Country"
                      fullWidth
                      autoComplete="cc-number"
                      variant="standard"
                      onChange={ handleChange }
                      defaultValue={ values.country }
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <TextField
                      required
                      name="city"
                      label="City"
                      fullWidth
                      autoComplete="cc-number"
                      variant="standard"
                      onChange={ handleChange }
                      defaultValue={ values.city }
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <TextField
                      required
                      name="state"
                      label="State"
                      fullWidth
                      autoComplete="cc-number"
                      variant="standard"
                      onChange={ handleChange }
                      defaultValue={ values.state }
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <TextField
                      required
                      name="street"
                      label="Street"
                      fullWidth
                      autoComplete="cc-number"
                      variant="standard"
                      onChange={ handleChange }
                      defaultValue={ values.street }
                    />
                  </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        name="price"
                        label="Price"
                        fullWidth
                        autoComplete="cc-exp"
                        variant="standard"
                        onChange={ handleChange }
                        defaultValue={ values.price }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel id="property-type">Property Type</InputLabel>
                        <Select
                          labelId="property-type"
                          name='type'
                          onChange={handleChange}
                          label="Property type"
                          value={values.type}
                        >
                          <MenuItem value={'Apartment'}>Apartment</MenuItem>
                          <MenuItem value={'House'}>House</MenuItem>
                          <MenuItem value={'Studio'}>Studio</MenuItem>
                        </Select>
                      </FormControl >
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        name="nBath"
                        label="The number of bathroom"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                        onChange={ handleChange }
                        defaultValue={ values.nBath }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        name="amenity"
                        label="Amenities"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                        onChange={ handleChange }
                        defaultValue={ values.amenity }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <UploadThumbnailButton ButtonText="Update ThumbNail" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <UploadImagesButton ButtonText="Upload Images" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CreateRoomModal />
                    </Grid>
                    {roomList && roomList.map((element, key) => {
                      return (
                        <React.Fragment key={key}>
                          <Grid item xs={12} md={6}>
                            <RoomPropertyItem type={element.type} nBeds={element.nBeds} idx={element.idx}/>
                          </Grid>
                        </React.Fragment>
                      )
                    })}
                    <Grid item xs={12} md={6}>
                      <Button type='submit'>Update</Button>
                    </Grid>
                  </React.Fragment>
                </Grid>
              </Form>
            )}
          </Formik>
        </React.Fragment>
      }
    </div>)
};

export default EditListForm;
