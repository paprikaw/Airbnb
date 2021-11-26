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

const CreateListForm = () => {
  const context = React.useContext(StoreContext);
  const token = context.token[0];
  const setList = context.list[1];
  const [roomList, setRoomList] = context.roomList;
  const thumbnail = context.thumbnail[0];
  const setListHead = context.listHead[1];
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Create Listing
      </Typography>
      <Formik
        initialValues={{ title: '', country: '', city: '', state: '', street: '', price: 0, type: 'Apartment', nBath: 0, amenity: '', }}
        onSubmit={(values, { setSubmitting }) => {
          console.log('here');
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
              nBath: values.bathroomNumber,
              type: values.type,
              rooms: roomList,
            }
          }
          setRoomList([]);
          setListHead([]);
          fetchPost('POST', '/listings/new', body, token)
            .then(listid => {
              updateList(token, setList);
              console.log(listid);
            })
            .catch(err => {
              alert(err);
            })
        }}
      >
        {({ handleChange, values }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  name="title"
                  label="Title of your list"
                  fullWidth
                  autoComplete="cc-name"
                  variant="standard"
                  onChange={ handleChange }
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
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  required
                  name="stree"
                  label="Street"
                  fullWidth
                  autoComplete="cc-number"
                  variant="standard"
                  onChange={ handleChange }
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
                  name="bathroomNumber"
                  label="The number of bathroom"
                  fullWidth
                  autoComplete="cc-csc"
                  variant="standard"
                  onChange={ handleChange }
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
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UploadThumbnailButton ButtonText="Upload ThumbNail" />
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
                <Button type='submit'>Confirm</Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>)
};

export default CreateListForm;
