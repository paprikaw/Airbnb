
/* The login page start up code is from: https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js */
import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles';
import fetchPost from '../utils/fetchPost';
import { StoreContext } from '../utils/store';
import { useNavigate } from 'react-router';

/* Styling */
const WindowBox = styled(Box)({
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Login = () => {
  const navigate = useNavigate();
  const context = React.useContext(StoreContext);
  const setToken = context.token[1];
  const setAuth = context.auth[1];
  const setList = context.list[1];
  const setOwner = context.owner[1];
  const loginSubmitHandle = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const body = {
      email: data.get('email1'),
      password: data.get('password1'),
    };
    fetchPost('POST', '/user/auth/login', body, null)
      .then(fetchToken => {
        setToken(fetchToken.token);
        console.log(fetchToken);
        setAuth(true);
        fetchPost('Get', '/listings', null, null)
          .then(data => {
            console.log(data.listings)
            setList(data.listings);
          })
          .catch(err => {
            alert(err);
          })
        setOwner(body.email);
        navigate('/HostedList');
      })
      .catch(err => {
        alert(err);
      })
  }

  return (
   <Container component="main" maxWidth="xs">
     <CssBaseline />
      <WindowBox>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={loginSubmitHandle} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email1"
            label="Email Address"
            name="email1"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password1"
            label="Password"
            type="password"
            id="password1"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to={'/register'}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </WindowBox>
   </Container>
  );
};

/* Handler function */
export default Login
