
import React from 'react';
import './App.css';
import {Link, Routes, Navigate, Route, BrowserRouter as Router} from 'react-router-dom';
import Result from './pages/ResultScreen';
import MainScreen from './components/MainScreen';
import InitScreen from './pages/InitScreen';




function App() {
    return (
    <div className="app--container">
      <MainScreen/>
      <main>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate replace to='inicio'/>} />
          <Route path='/inicio' element={<InitScreen/>} />
          <Route path='/resultados' exact element={<Result/>} />
        </Routes>
      </Router>
      </main>
      
    </div>
   );
  }

export default App;
