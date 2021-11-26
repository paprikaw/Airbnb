/* Start up top bar code is from https://mui.com/components/app-bar/ */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuButton from './MenuButton';
import UserProfileButton from './Buttons/UserProfileButton';

export default function BaseTopBar ({ leftComponents = null, rightComponents = null }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar id='toolbar'>
          <MenuButton />
          {leftComponents}
          <Box sx={{ flexGrow: 1 }} />
          {rightComponents}
          <UserProfileButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
