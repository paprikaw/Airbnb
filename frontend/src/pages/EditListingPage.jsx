import * as React from 'react';
import { StoreContext } from '../utils/store';
import LoginNotice from '../components/LoginNotice';
import { useParams } from 'react-router';
import ListingFormContainer from '../components/List_components/ListingFormContainer';
import EditListForm from '../components/List_components/EditListForm';

export default function EditListPage () {
  const { listingId } = useParams();
  console.log(listingId);
  const context = React.useContext(StoreContext);
  const auth = context.auth[0];

  if (auth) {
    return (
      <ListingFormContainer>
        <EditListForm listingId={ listingId }/>
      </ListingFormContainer>
    );
  } else {
    return <LoginNotice />
  }
}
