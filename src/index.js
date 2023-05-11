import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Pages/Home/Home';
import Root from './routes/root';
import ErrorPage from './Pages/Error/Error.js';
import {PokedexPage} from './Pages/Pokedex/Pokedex';
import Auth from './Pages/Auth/Auth';
import Private from './routes/Private';
import {RouterProvider, createBrowserRouter}  from 'react-router-dom';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import './css/main.css';
import Detail from './Pages/Detail/Detail';

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/Pokedex',
        element: <Private><PokedexPage /></Private>
      },
      {
        path: '/Login',
        element: <Auth />
      },
      { 
        path: '/Detail',
        element:  <Private><Detail/></Private>
      }
    ]
  },
], {v7_normalizeFormMethod: true})




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    
    <RouterProvider router={router} />
  </React.StrictMode>
);
