/* eslint-disable react/prop-types */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BaseTopBar from '../BaseTopBar';
import { StoreContext } from '../../utils/store';

export default function ListingFormContainer (props) {
  const theme = createTheme();
  const context = React.useContext(StoreContext);
  const [auth, setAuth] = context.auth;
  console.log(auth);
  const token = context.token[0];
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BaseTopBar token={token} auth={auth} setAuth={setAuth}/>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            { props.children }
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
