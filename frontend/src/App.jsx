import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx'
import StoreProvider from './utils/store'
import Register from './pages/register';
import Test from './tests/Test';
import HostedListPage from './pages/HostedListPage';
import CreateListingPage from './pages/CreateListingPage';
import EditListPage from './pages/EditListingPage';
import ListingPage from './pages/ListingPage';
function App () {
  return (
    <StoreProvider>
      <Router>
         <Routes>
           <Route path={'/'} element={<ListingPage />}/>
           <Route path={'/login'} element={<Login />}/>
           <Route path={'/register'} element={<Register />}/>
           <Route path={'/Test'} element={<Test />}/>
           <Route path={'/HostedList/'} element={<HostedListPage />}/>
           <Route path={'/CreateList'} element={<CreateListingPage />}/>
           <Route path={'/EditList/:listingId'} element={<EditListPage />}/>
         </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;
