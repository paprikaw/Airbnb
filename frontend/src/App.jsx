import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx'
import StoreProvider from './utils/store'
import Register from './pages/register';
import BaseTopBar from './components/BaseTopBar';
import MenuButton from './components/MenuButton';
import Test from './tests/Test';
import HostedListPage from './pages/HostedListPage';

function App () {
  return (
    <StoreProvider>
      <Router>
         <Routes>
           <Route path={'/'} element={<Login />}/>
           <Route path={'/register'} element={<Register />}/>
           <Route path={'/topbarTest'} element={<BaseTopBar />}/>
           <Route path={'/DrawerTest'} element={<MenuButton />}/>
           <Route path={'/Test'} element={<Test />}/>
           <Route path={'/HostedList'} element={<HostedListPage />}/>
         </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;
