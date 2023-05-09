import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Pages/Home/Home';
import Root from './routes/root';
import ErrorPage from './Pages/Error/Error.js';
import PokedexPage from './Pages/Pokedex/Pokedex';
import {RouterProvider, createBrowserRouter}  from 'react-router-dom';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import './css/main.css';

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
        element: <PokedexPage />
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
