import React from 'react';
import logo from './logo.svg';

import './App.css';
import { Login } from './features/login/Login';
import Students from './features/login/Students';

function App() {
  return (
    <div>
      <Login/>
      <Students/>
    </div>
  );
}

export default App;
