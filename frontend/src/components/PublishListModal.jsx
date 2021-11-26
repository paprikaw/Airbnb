// Render Prop
import React from 'react';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import { Button, Typography, FormControl, Modal, Box } from '@mui/material';
import { StoreContext } from '../utils/store';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import fetchPost from '../utils/fetchPost';
import { updateList } from '../utils/updateList';

const now = new Date();
const yesterdayBegin = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

const PublishListModal = ({ listingId = -1, func = () => {} }) => {
  const context = React.useContext(StoreContext);
  const [open, setOpen] = React.useState(false);
  const token = context.token[0]
  const [rangeList, setRangeList] = React.useState([]);
  const setList = context.list[1];
  const value = React.useState([yesterdayBegin, todayEnd])[0];
  const handleClearAll = () => {
    setRangeList([]);
  }
  const onChange = (value) => {
    if (value !== null) {
      setRangeList([...rangeList, [value[0], value[1]]]);
      console.log(value);
    }
  }
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
      <Button onClick={handleOpen} id='PublishButton'>Publish</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-room-modal"
        aria-describedby="create-a-room-in-modal"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Confirm your publishing
          </Typography>
          <Formik
            initialValues={{}}
            onSubmit={() => {
              console.log(listingId);
              console.log(rangeList);
              console.log(token);
              if (listingId !== -1) {
                const body = {
                  availability: rangeList.length > 0 ? rangeList : [[new Date(), new Date()]],
                };
                fetchPost('PUT', `/listings/publish/${listingId}`, body, token)
                  .then(_ => {
                    updateList(token, setList);
                    func(true);
                  })
                  .catch(err => {
                    alert(err);
                  })
                handleClose();
              } else {
                alert('Error Happened');
              }
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                      <DateRangePicker
                        calendarAriaLabel="Toggle calendar"
                        clearAriaLabel="Clear value"
                        dayAriaLabel="Day"
                        monthAriaLabel="Month"
                        nativeInputAriaLabel="Date"
                        onChange={onChange}
                        value={value}
                        yearAriaLabel="Year"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                      {rangeList.length > 0 &&
                        <React.Fragment>
                          {rangeList.map((element, index) => {
                            return (
                              <React.Fragment key={index}>
                                <Typography>{`${element[0].toLocaleDateString()} - ${element[1].toLocaleDateString()}`}</Typography>
                              </React.Fragment>
                            )
                          })}
                          <Button onClick={handleClearAll}>
                            Clear all
                          </Button>
                        </React.Fragment>
                      }
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
export default PublishListModal;
