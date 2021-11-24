import fetchPost from './fetchPost';

const updateList = (token, setListFunc) => {
  fetchPost('Get', '/listings', null, token)
    .then(fetchedLists => {
      setListFunc(fetchedLists.listings);
    })
    .catch(err => {
      alert(err);
    })
}

export { updateList };
