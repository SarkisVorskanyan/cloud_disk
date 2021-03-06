import React, { useEffect, useState } from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import RegistrationPage from './pages/Registration';
import LoginPage from './pages/LoginPage';
import { useAppDispatch, useAppSelector } from './store/hooks/Hooks';
import HomePage from './pages/HomePage';
import { auth } from './store/actions/Auth_action';
import ModalCreateFoldier from './components/UI/modals/ModalCreateFoldier';
import { resetFiles } from './store/reduxers/File_reducer';
import Toaster from './components/UI/toasters/Toaster';
import ProfilePage from './pages/ProfilePage';

function App() {

  const {isAuth} = useAppSelector(state => state.auth)
  const {files} = useAppSelector(state => state.file)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(auth())
    return () => {
      dispatch(resetFiles())
    }
  }, [])

  return (
    <div>
      <Toaster />
        <Header />
      <div className='app'>
          <Routes>
            <Route path='/' element={!isAuth ? <Navigate to='/registration' /> : <HomePage />} />
            <Route path='/registration' element={isAuth ? <Navigate to='/' /> : <RegistrationPage />} />
            <Route path='/login' element={isAuth ? <Navigate to='/' /> : <LoginPage />} />
            <Route path='/profile' element={!isAuth ? <Navigate to='/registration' /> : <ProfilePage />} />
        </Routes>
      </div>
    </div>
    
    
  );
}

export default App;
