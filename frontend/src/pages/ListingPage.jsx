import BaseTopBar from '../components/BaseTopBar';
import HostedListing from '../components/List_components/HostedListing';
import * as React from 'react';
import { StoreContext } from '../utils/store';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import fetchPost from '../utils/fetchPost';
import ListingItem from '../components/List_components/ListingItem';
export default function ListingPage () {
  const context = React.useContext(StoreContext);
  // const auth = context.auth[0];
  const [list, setList] = context.list;
  const [listingIds, setListingIds] = React.useState([]);
  const [userListDetails, setUserListDetails] = React.useState([]);
  // const [allLists, setAllLists] = React.useState([]);
  const navigate = useNavigate();
  const PromiseList = []
  const fabStyle = {
    position: 'fixed',
    bottom: 20,
    right: 20,
    top: 'auto',
  };
  React.useEffect(() => {
    fetchPost('Get', '/listings', null, null)
      .then(data => {
        setList(data.listings);
      })
      .catch(err => {
        alert(err);
      })
  }, [])
  const handleAddButton = () => {
    navigate('/CreateList');
  }

  React.useEffect(() => {
    if (list.length > 0) {
      setListingIds(list.map(element => element.id));
    }
  }, [list]);

  React.useEffect(() => {
    if (listingIds.length > 0) {
      listingIds.forEach(id => {
        console.log(id);
        PromiseList.push(fetchPost('GET', `/listings/${id}`, null, null));
      })
      Promise.all(PromiseList)
        .then(value => {
          console.log(value);
          setUserListDetails(value.map(element => element.listing).filter(element => element.published));
        })
        .catch(err => alert(err));
    }
  }, [listingIds])

  return (
    <React.Fragment>
      <BaseTopBar />
      <HostedListing>
        {userListDetails.length > 0 && userListDetails.map((element, index) => (
          <React.Fragment key={index}>
            <ListingItem
              title={element.title}
              propertyType={element.metadata.type}
              price={element.price}
              nReviews={element.reviews.length}
              rating={0}
              nBath={element.metadata.nBath}
              thumbNail={ element.thumbnail ? element.thumbnail : 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6'}
              listingId = {listingIds.length > 0 && listingIds[index]}
              isPublished = {element.published}
            />
          </React.Fragment>
        ))}
      </HostedListing>
      <Fab sx={fabStyle} aria-label={'add'} color={'secondary'} size='small' onClick={handleAddButton}>
        <AddIcon />
      </Fab>
    </ React.Fragment>
  )
}
