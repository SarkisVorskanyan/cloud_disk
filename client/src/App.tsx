import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />
      <div className='app'>
          <Routes>
            <Route path='/home' element={<AuthPage />} />
        </Routes>
      </div>
    </div>
    
    
  );
}

export default App;
