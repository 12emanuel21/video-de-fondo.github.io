# Mi Proyecto React

Este es un ejemplo de cómo estructurar tu aplicación React.

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Registrar from './components/Registrar';
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Login</Link></li> 
            <li><Link to="/registrar">Registrar</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/registrar" element={<Registrar />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
