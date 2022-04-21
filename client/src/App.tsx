import React from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import RegistrationPage from './pages/Registration';
import LoginPage from './pages/LoginPage';
import { useAppSelector } from './store/hooks/Hooks';
import HomePage from './pages/HomePage';

function App() {

  const {isAuth} = useAppSelector(state => state.auth)

  return (
    <div>
      <Header />
      <div className='app'>
          <Routes>
            <Route path='/registration' element={isAuth ? <Navigate to='/' /> : <RegistrationPage />} />
            <Route path='/login' element={isAuth ? <Navigate to='/' /> : <LoginPage />} />
            <Route path='/' element={!isAuth ? <Navigate to='/registration' /> : <HomePage />} />
        </Routes>
      </div>
    </div>
    
    
  );
}

export default App;
