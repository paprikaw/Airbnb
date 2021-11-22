import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListingForm from '../components/ListingCreateForm';
import BaseTopBar from '../components/BaseTopBar';
import { StoreContext } from '../utils/store';
import LoginNotice from '../components/LoginNotice';
export default function CreateListingPage () {
  const context = React.useContext(StoreContext);
  const auth = context.auth[0];
  const theme = createTheme();
  if (auth) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BaseTopBar />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <ListingForm />
          </Paper>
        </Container>
      </ThemeProvider>
    );
  } else {
    return <LoginNotice />
  }
}
