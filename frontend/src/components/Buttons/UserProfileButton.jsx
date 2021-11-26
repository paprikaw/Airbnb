/* Start up top bar code is from https://mui.com/components/app-bar/ */
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router';
import { MenuItem } from '@mui/material';
import { StoreContext } from '../../utils/store';
import fetchPost from '../../utils/fetchPost';

export default function UserProfileButton () {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const context = React.useContext(StoreContext);
  const [auth, setAuth] = context.auth;
  const token = context.token[0];
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
    <React.Fragment>
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
        {auth &&
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        }
        {!auth &&
          <MenuItem onClick={handleLogin}>Login</MenuItem>
        }
      </Menu>
    </React.Fragment>
  );
}
