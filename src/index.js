import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Pages/Home/Home';
import Root from './routes/root';
import ErrorPage from './Pages/Error/Error.js';
import Pokedex from './Pages/Pokedex/Pokedex';
import {RouterProvider, createBrowserRouter}  from 'react-router-dom';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import './css/main.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/Pokedex',
        element: <Pokedex />
      }
    ]
  },
])




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
