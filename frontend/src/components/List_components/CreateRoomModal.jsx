// Render Prop
import React from 'react';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Typography, MenuItem, InputLabel, FormControl, Modal, Box } from '@mui/material';
import Select from '@mui/material/Select';
import { StoreContext } from '../../utils/store';

const CreateRoomModal = () => {
  const context = React.useContext(StoreContext);
  const [open, setOpen] = React.useState(false);
  const [roomList, setRoomList] = context.roomList;
  const [listHead, setListHead] = context.listHead;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  // const [roomList, setRoomList] = React.useState([]);
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Add room</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-room-modal"
        aria-describedby="create-a-room-in-modal"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Create Room
          </Typography>
          <Formik
            initialValues={{ type: '', nBeds: 0 }}
            onSubmit={(values, { setSubmitting }) => {
              const body = {
                idx: listHead,
                type: values.type,
                nBeds: values.nBeds
              };
              setRoomList([...roomList, body]);
              setListHead(listHead + 1);
              handleClose();
              console.log(listHead);
            }}
          >
            {({ handleChange, values, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                      <InputLabel id="room-type">Room Type</InputLabel>
                      <Select
                        labelId="room-type"
                        name='type'
                        onChange={handleChange}
                        label="Room type"
                        value={values.type}
                      >
                        <MenuItem value={'Master Bedroom'}>Master Bedroom</MenuItem>
                        <MenuItem value={'Guest Bedroom'}>Guest Bedroom</MenuItem>
                        <MenuItem value={'Basement'}>Basement</MenuItem>
                      </Select>
                    </FormControl >
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      name="nBeds"
                      label="The number of beds"
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
        </Box >
      </Modal>
    </React.Fragment>
  )
};
export default CreateRoomModal;
