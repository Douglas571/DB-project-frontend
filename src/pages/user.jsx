import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks"

import * as api from "@/util/api";

import useStore from '@/store'


export default function User() {
    const [user, _] = useLocalStorage("user", null)

    const [error, setError] = useState('')

    const routines = useStore( state => state.routines )
    const setRoutines = useStore( state => state.setRoutines )

    const [editing, setEditing] = useState(false)

    async function handleSaveRoutine(newRoutine) {

        if (!newRoutine.title) {
            setEditing(!editing)
            return 
        }
        const res = await api.addNewRoutine(user, newRoutine);

        console.log({res})

        if (res.err) {
            setError(res.err)
            setTimeout(() => setError(''), 3000)
        } else {
            setRoutines(res.data)
        }
        
        setEditing(false)
        //setRoutine(newRoutine)
    }

    async function handleDeleteRoutine(routine) {
        console.log({deleteThisRoutine: routine})

        let res = await api.deleteRoutine(user, routine)

        setRoutines(res.data)
    }

    let routineElements = routines?.map( routine => {
        return (
            <tr key={routine.id}>
                <td>
                    <Link to={`/routines/${routine.id}`}
                        data-test={`user-routine-${routine.title}`}>{routine.title} </Link>
                </td>
                <td>
                    {routine?.exercises?.length || 0}
                </td>
                <td>
                    <button onClick={() => handleDeleteRoutine(routine)}>Eliminar</button>
                </td>
            </tr>
        )
    })


    if (routineElements?.length == 0) {
        routineElements = <div>No tienes rutinas, crea una nueva!!</div>    }

    return (
        <>
            <h1 data-test="user-home-greeting">Bienvenido {user.username}</h1>
            <h3>Rutinas <button onClick={() => setEditing(!editing)} data-test="user-add-routine-button">Agregar Rutina</button></h3>
            
            <div>{error}</div>
            { editing && <RoutineEditor onSaveRoutine={handleSaveRoutine}/>}
            

            <table data-test="user-routine-list" border={1}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Numero de ejercicios</th>
                        <th></th>
                    </tr>
                </thead>
                { routineElements }
            </table>
        </>
    )
}

function RoutineEditor({onSaveRoutine}) {
    const [newRoutine, setNewRoutine] = useState({

    })

    function handleChange(evt) {
        const {name, value} = evt.target
        setNewRoutine({...newRoutine, [name]: value})
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onSaveRoutine(newRoutine)
    }

    function handleChange(evt) {
        const { name, value } = evt.target
        // console.log({name, value})
        setNewRoutine({...newRoutine, [name]: value})
    }

    return (
        <>
            <h4>Nueva Rutina</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Nombre: </label>
                    <input type='text' 
                        value={newRoutine.title} 
                        onChange={handleChange} 
                        name='title'
                        data-test="user-add-routine-title"/>
                </div>

                <div><button type='submit'
                    data-test="user-add-routine-save-button">Guardar</button></div>
            </form>
            <br/>
        </>
    )
}