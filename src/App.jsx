import React, { useState, useEffect } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import useStore from '@/store'
import { useLocalStorage } from "@uidotdev/usehooks"

import MainLayout from './layout/main';

import Home from './pages/home'
import SingUp from './pages/singup'
import SingIn from './pages/singin'

import UserHome from './pages/user'

import Routines from './pages/routines'
import RoutinesView from './pages/routinesView'
import RoutineExerciseView from './pages/routineExerciseView'

function App() {
    const [user, _] = useLocalStorage("user", null)
    const setStoreUser = useStore( store => store.setUser )

    useEffect(() => {
        setStoreUser(user)
    }, [user])

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
      

    return <div>
        <RouterProvider router={router} />
    </div>
  }

export default App