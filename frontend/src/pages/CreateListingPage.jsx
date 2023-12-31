import * as React from 'react';
import ListingForm from '../components/List_components/ListingCreateForm';
import { StoreContext } from '../utils/store';
import LoginNotice from '../components/LoginNotice';
import ListingFormContainer from '../components/List_components/ListingFormContainer';

export default function CreateListingPage () {
  const context = React.useContext(StoreContext);
  const auth = context.auth[0];
  if (auth) {
    return (
      <ListingFormContainer>
        <ListingForm />
      </ListingFormContainer>
    );
  } else {
    return <LoginNotice />
  }
}
