import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IconButton } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router';

export default function MenuButton () {
  const [menuState, setMenuState] = React.useState(false);
  const navigate = useNavigate();
  const HostedListHandler = () => {
    navigate('/HostedList');
  }
  const AllListHandler = () => {
    navigate('/');
  }
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMenuState(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key={'Hosted lists'} onClick={HostedListHandler}>
          <ListItemText primary={'Hosted lists'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={'All Lists'} onClick={AllListHandler}>
          <ListItemText primary={'All Lists'} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        color="inherit"
        aria-label="menu"
        sx={{ ml: 1 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={'left'}
        open={menuState}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}
