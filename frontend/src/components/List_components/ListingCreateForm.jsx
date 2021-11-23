// Render Prop
import React from 'react';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import fetchPost from '../../utils/fetchPost';
import { StoreContext } from '../../utils/store';
import { updateList } from '../../utils/updateList';

const CreateListForm = () => {
  const context = React.useContext(StoreContext);
  const token = context.token[0];
  const setList = context.list[1];
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Create Listing
      </Typography>
      <Formik
        initialValues={{ title: '', address: '', price: 0, type: '', nBath: 0, amenity: '', bedRooms: {} }}
        onSubmit={(values, { setSubmitting }) => {
          console.log('here');
          const body = {
            title: values.title,
            address: { address: values.address },
            price: values.price,
            thumbnail: null,
            metadata: {
              amenity: values.amenity,
              nBath: values.bedroomNumber,
              type: values.type,
              bedRooms: {
                nBeds: 0,
                type: null
              },
            }
          }
          fetchPost('POST', '/listings/new', body, token)
            .then(listid => {
              updateList(token, setList);
              return console.log(listid);
            })
            .catch(err => {
              alert(err);
            })
        }}
      >
        {({ handleChange }) => (
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
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  name="address"
                  label="Address"
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
                  helperText="Last three digits on signature strip"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  name="type"
                  label="Property type"
                  fullWidth
                  autoComplete="cc-csc"
                  variant="standard"
                  onChange={ handleChange }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  name="bedroomNumber"
                  label="The number of bedrooms"
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
                <Button type='submit'>Confirm</Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>)
};

export default CreateListForm;
