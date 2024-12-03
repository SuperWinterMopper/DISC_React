import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './pages/App/App';
import OtherProfile from './pages/OtherProfile/OtherProfile';
import NotFound from './pages/NotFound/NotFound'
import Message from './pages/Message/Message';
import Test from './pages/Test/Test';
import MyProfile from './pages/MyProfile/MyProfile';
import Login from './pages/Authentication/Login';
import SignUp from './pages/Authentication/SignUp'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: '/app',
    element: <App />,
  },
  {
    path: '/otherProfile/:profileID',
    element: <OtherProfile />,
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
    path: '/myprofile',
    element: <MyProfile />
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
