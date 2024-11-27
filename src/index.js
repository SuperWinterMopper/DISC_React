import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './pages/App/App';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound'
import Message from './pages/Message/Message';
import Test from './pages/Test/Test';
import Me from './pages/Me/Me';
import Login from './pages/Authentication/Login';
import SignUp from './pages/Authentication/SignUp'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/profile/:profileID',
    element: <Profile />,
  },
  {
    path: '/message',
    element: <Message />,
  },
  {
    path: '/test',
    element: <Test />,
  },
  {
    path: '/me',
    element: <Me />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  }
]); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
