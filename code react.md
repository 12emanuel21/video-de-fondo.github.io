# Mi Proyecto React

Este es un ejemplo de cómo estructurar tu aplicación React.

```jsx
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'

const Login = lazy(() => import('./components/Login'));
const Registrar = lazy(()=> import( './components/Registrar'));

import Loading_carga from './components/Loading_carga';

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
        <Suspense fallback={<Loading_carga/>}>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/registrar" element={<Registrar />} />
        </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;

