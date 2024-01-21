import React from 'react';
import ReactDOM from 'react-dom/client';

import MainLayout from './layout/main';

import Home from './pages/home'
import SingUp from './pages/singup'
import SingIn from './pages/singin'

import UserHome from './pages/user'

import Routines from './pages/routines'
import RoutinesView from './pages/routinesView'
import RoutineExerciseView from './pages/routineExerciseView'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: '/',
        Component: Home
      },
      {
        path: '/singup',
        element: <SingUp/>
      },
      {
        path: '/singin',
        element: <SingIn/>
      },
      {
        path: '/user',
        element: <UserHome/>
      },
      {
        path: '/routines',
        element: <Routines/>
      },
      {
        path: '/routines/:id',
        element: <RoutinesView/>
      },
      {
        path: '/routines/:id/exercise/:exerciseID',
        element: <RoutineExerciseView/>
      },
    ]
  }
])


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// TODOs
// setup router
// create a login
// create a register