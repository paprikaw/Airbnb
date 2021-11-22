import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx'
import StoreProvider from './utils/store'
import Register from './pages/register';
import Test from './tests/Test';
import HostedListPage from './pages/HostedListPage';
import CreateListingPage from './pages/CreateListingPage';

function App () {
  return (
    <StoreProvider>
      <Router>
         <Routes>
           <Route path={'/'} element={<Login />}/>
           <Route path={'/register'} element={<Register />}/>
           <Route path={'/Test'} element={<Test />}/>
           <Route path={'/HostedList'} element={<HostedListPage />}/>
           <Route path={'/CreateList'} element={<CreateListingPage />}/>
         </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;
