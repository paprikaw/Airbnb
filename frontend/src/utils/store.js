/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* Code from https://dev.to/nazmifeeroz/using-usecontext-and-usestate-hooks-as-a-store-mnm */
// ./utils/store.js

import React from 'react';

export const StoreContext = React.createContext(null);

export default ({ children }) => {
  const [token, setToken] = React.useState(null);
  const [auth, setAuth] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [owner, setOwner] = React.useState(null);
  const [roomList, setRoomList] = React.useState([]);
  const [listHead, setListHead] = React.useState(0);
  const [thumbnail, setThumbnail] = React.useState('');
  const [localImages, setLocalImages] = React.useState([]);
  const [listingInfos, setListingInfos] = React.useState({});
  const [listingIds, setListingIds] = React.useState([]);
  const store = {
    token: [token, setToken],
    auth: [auth, setAuth],
    list: [list, setList],
    owner: [owner, setOwner],
    roomList: [roomList, setRoomList],
    listHead: [listHead, setListHead],
    thumbnail: [thumbnail, setThumbnail],
    localImages: [localImages, setLocalImages],
    listingInfos: [listingInfos, setListingInfos],
    listingIds: [listingIds, setListingIds],
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
