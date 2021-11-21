import BaseTopBar from '../components/BaseTopBar';
// import ListedItem from '../components/ListedItem';
import HostedListing from '../components/HostedListing';
import * as React from 'react';
import { StoreContext } from '../utils/store';
import LoginNotice from '../components/LoginNotice';

export default function HostedListPage () {
  const context = React.useContext(StoreContext);
  const auth = context.auth[0];
  if (auth) {
    return (
      <div>
        <BaseTopBar />
        <HostedListing />
      </div>
    )
  } else {
    return (
      <LoginNotice />
    )
  }
}
