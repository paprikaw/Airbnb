import React from 'react';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid'; import TextField from '@mui/material/TextField';
import { Button, IconButton, Typography, FormControl, Modal, Box } from '@mui/material';
// import { StoreContext } from '../../utils/store';
import SearchIcon from '@mui/icons-material/Search';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Slider from '@mui/material/Slider';
import { StoreContext } from '../utils/store';

function roomNumberSlidertext (value) {
  return `${value}`;
}

function priceSlidertext (value) {
  return `${value}`;
}

const now = new Date();
const yesterdayBegin = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

const SearchModal = () => {
  // const context = React.useContext(StoreContext);
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState([yesterdayBegin, todayEnd]);
  const [roomNumber, setRoomNumber] = React.useState([8, 14]);
  const [priceRange, setPriceRange] = React.useState([900, 1500]);
  const context = React.useContext(StoreContext);
  const userListDetails = context.userListDetails[0];
  const setlistingPageRenderList = context.listingPageRenderList[1];
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRoomSliderChange = (event, newvalue) => {
    setRoomNumber(newvalue);
  };

  const handlePriceSliderChange = (event, newvalue) => {
    setPriceRange(newvalue);
  };

  const handleDateRangerChange = (value) => {
    if (value !== null) {
      setDateRange(value);
    }
  }

  const handleUnapplyFilter = () => {
    setlistingPageRenderList(userListDetails);
    handleClose()
  }
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
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
      <IconButton onClick={handleOpen}><SearchIcon /></IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-room-modal"
        aria-describedby="create-a-room-in-modal"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Apply filter to search
          </Typography>
          <Formik
            initialValues={{ searchText: '' }}
            onSubmit={(values, { setSubmitting }) => {
              // Reload the listing page first
              // Filter text
              let filteredDetails = userListDetails;
              console.log(filteredDetails);
              if (values.searchText !== '') {
                const wordArray = values.searchText.toLowerCase().split(' ');
                filteredDetails = filteredDetails
                  .filter(element => {
                    return (wordArray.some(word =>
                      [element.address.country.toLowerCase(),
                        element.address.city.toLowerCase(),
                        element.address.state.toLowerCase(),
                        element.address.street.toLowerCase(),
                        element.title.toLowerCase()].some((item) => item.includes(word))
                    ))
                  })
              }
              filteredDetails = filteredDetails
                .filter(element => {
                  return (
                    element.availability.some(item => new Date(item[0]) <= dateRange[0] && new Date(item[1]) >= dateRange[1])
                  )
                })
                .filter(element => {
                  return (element.price < priceRange[1] && element.price > priceRange[0])
                })
              setlistingPageRenderList(filteredDetails);
              handleClose();
            }}
          >
            {({ handleChange, values, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      name="searchText"
                      label="Search key words"
                      fullWidth
                      autoComplete="cc-csc"
                      variant="standard"
                      onChange={ handleChange }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                        <Typography variant="h7" gutterBottom>
                          Choose a time range
                        </Typography>
                        <DateRangePicker
                          calendarAriaLabel="Toggle calendar"
                          clearAriaLabel="Clear value"
                          dayAriaLabel="Day"
                          monthAriaLabel="Month"
                          nativeInputAriaLabel="Date"
                          onChange={handleDateRangerChange}
                          value={dateRange}
                          yearAriaLabel="Year"
                        />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ width: 300 }}>
                      <Typography variant="h7" gutterBottom>
                        Number of Beds
                      </Typography>
                      <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={roomNumber}
                        max={20}
                        onChange={handleRoomSliderChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={roomNumberSlidertext}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ width: 300 }}>
                      <Typography variant="h7" gutterBottom>
                        Price range
                      </Typography>
                      <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={priceRange}
                        max={2000}
                        onChange={handlePriceSliderChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={priceSlidertext}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type='submit'>Confirm</Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button onClick={handleUnapplyFilter}>Unapply filters</Button>
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
export default SearchModal;
