import BaseTopBar from '../components/BaseTopBar';
import ListedItem from '../components/List_components/ListedItem';
import HostedListing from '../components/List_components/HostedListing';
import * as React from 'react';
import { StoreContext } from '../utils/store';
import LoginNotice from '../components/LoginNotice';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import fetchPost from '../utils/fetchPost';

export default function HostedListPage () {
  const context = React.useContext(StoreContext);
  const auth = context.auth[0];
  const navigate = useNavigate();
  const list = context.list[0];
  const owner = context.owner[0];
  const [userListDetails, setUserListDetails] = context.userListDetails;
  const PromiseList = []
  // const allHostedIds = [];
  const fabStyle = {
    position: 'fix',
    bottom: 16,
    right: 16,
  };

  const handleAddButton = () => {
    navigate('/CreateList');
  }

  // function fetchAll () {
  //   list.filter(element => element.owner === owner).map(element => element.id).forEach(id => {
  //     PromiseList.push(fetchPost('GET', `/listings/${id}`, null, null));
  //   })
  //   Promise.all(PromiseList)
  //     .then(value => {
  //       console.log(value);
  //       setUserListDetails(value);
  //     })
  //     .catch(err => alert(err));
  // }

  React.useEffect(() => {
    list.filter(element => element.owner === owner).map(element => element.id).forEach(id => {
      PromiseList.push(fetchPost('GET', `/listings/${id}`, null, null));
    })
    Promise.all(PromiseList)
      .then(value => {
        setUserListDetails(value.map(element => element.listing));
      })
      .catch(err => alert(err));
  }, [list]);

  if (auth) {
    return (
      <React.Fragment>
        <BaseTopBar />
        <HostedListing>
          {userListDetails.map((element, index) => (
            <React.Fragment key={index}>
              <ListedItem
              title={element.title}
              propertyType={element.metadata.type}
              price={element.price}
              nReviews={element.reviews.length}
              rating={0}
              nBath={element.metadata.nBath}
              />
            </React.Fragment>
          ))}
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
