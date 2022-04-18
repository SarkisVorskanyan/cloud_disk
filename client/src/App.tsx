import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import RegistrationPage from './pages/Registration';

function App() {
  return (
    <div>
      <Header />
      <div className='app'>
          <Routes>
            <Route path='/' element={<RegistrationPage />} />
        </Routes>
      </div>
    </div>
    
    
  );
}

export default App;
