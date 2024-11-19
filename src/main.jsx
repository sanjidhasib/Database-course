import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './Components/Root.jsx';
import Home from './Components/Home.jsx';
import Login from './Components/Login.jsx';
import Registration from './Components/Registration.jsx';

import Transaction from './Components/Transaction.jsx';
import Budgets from './Components/Budgets.jsx';

import { HeadDashboard } from './Components/HeadDashboard.jsx';
import Committes from './Components/Committes.jsx';
import User from './Components/User.jsx';
import Fund from './Components/Fund.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Registration></Registration>
      },
   
      {
        path: "/transaction",
        element: <Transaction></Transaction>
      },
      {
        path: "/budget",
        element: <Budgets></Budgets>
      },
     
    

      {
        path: "/Head",
        element: <HeadDashboard></HeadDashboard>
      },
      {
        path: "/Committe",
        element: <Committes></Committes>
      },
      {
        path: "/user",
        element: <User></User>
      },
     
      {
        path: "/fund",
        element: <Fund></Fund>
      },
     
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
