import BaseTopBar from '../components/BaseTopBar';
import ListedItem from '../components/ListedItem';
import HostedListing from '../components/HostedListing';
import * as React from 'react';
import { StoreContext } from '../utils/store';
import LoginNotice from '../components/LoginNotice';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';

export default function HostedListPage () {
  const context = React.useContext(StoreContext);
  const auth = context.auth[0];
  const navigate = useNavigate();
  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };
  const handleAddButton = () => {
    navigate('/CreateList');
  }
  if (auth) {
    return (
      <React.Fragment>
        <BaseTopBar />
        <HostedListing>
          <ListedItem />
        </HostedListing>
        <Fab sx={fabStyle} aria-label={'add'} color={'secondary'} size='small' onClick={handleAddButton}>
          <AddIcon />
        </Fab>
      </ React.Fragment>
    )
  } else {
    return (
      <LoginNotice />
    )
  }
}
