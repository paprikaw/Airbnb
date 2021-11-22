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
  const store = {
    token: [token, setToken],
    auth: [auth, setAuth],
    list: [list, setList],
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
