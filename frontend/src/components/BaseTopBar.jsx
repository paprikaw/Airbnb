/* Start up top bar code is from https://mui.com/components/app-bar/ */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PropTypes from 'prop-types';
import MenuButton from './MenuButton';
import fetchPost from '../utils/fetchPost';
import { StoreContext } from '../utils/store';
import { useNavigate } from 'react-router';

export default function BaseTopBar ({ leftComponents = null, rightComponents = null }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const context = React.useContext(StoreContext);
  const [auth, setAuth] = context.auth;
  const token = context.token[0];
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogin = () => {
    navigate('/login');
  }
  const handleLogout = () => {
    fetchPost('POST', '/user/auth/logout', null, token)
      .then(() => {
        setAuth(false);
        navigate('/');
      })
      .catch(err => {
        alert(err);
      })
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
          <MenuButton />
          {leftComponents}
          <Box sx={{ flexGrow: 1 }} />
          {rightComponents}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
          <AccountCircle/>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            {!auth &&
              <MenuItem onClick={handleLogin}>Login</MenuItem>
             }
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

BaseTopBar.propTypes = {
  leftComponents: PropTypes.element,
  rightComponents: PropTypes.element
};
