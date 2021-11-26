import * as React from 'react';
import ListingFormContainer from '../components/List_components/ListingFormContainer';
import ListingDetails from '../components/List_components/ListingDetails';

export default function ListingDetailPage () {
  return (
    <React.Fragment>
      <ListingFormContainer>
        <ListingDetails/>
      </ListingFormContainer>
    </React.Fragment>
  );
}
