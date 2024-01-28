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

import RoutinesView from './pages/routinesView'
import RoutineExerciseView from './pages/routineExerciseView'

import * as api from "@/util/api";

function App() {
    const [user, _] = useLocalStorage("user", null)
    const setStoreUser = useStore( store => store.setUser )
    const setRoutines = useStore( store => store.setRoutines)
    const setActivity = useStore( state => state.setActivity)

    async function init() {
        console.log('INIT!!')
        let { data: routines } = await api.getRoutines(user)
        let { data: activities} = await api.getActivities()
		

        console.group('ROOT.init')
          console.log({ routines, activities})

        console.groupEnd()

        setRoutines(routines)

        setActivity(activities)
    }

    useEffect(() => {
      console.log("INIT USE EFFECT")

        init()
    }, [])

    useEffect(() => {
      (async () => {
        if (user) {
          let res = await api.getRoutines(user)
  
          const routines = res.data
  
          console.log({useEffectRoutines: routines})
          setRoutines(routines)
        } else {
          setRoutines([])
        }
      })()

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