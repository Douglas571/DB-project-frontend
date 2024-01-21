import { useState } from 'react'
import { Link } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks"

import useStore from '@/store'


export default function User() {
    const [user, _] = useLocalStorage("user", null)

    const routines = useStore( state => state.routines )
    const saveNewRoutine = useStore( state => state.saveNewRoutine )

    const [editing, setEditing] = useState(false)

    function handleSaveRoutine(newRoutine) {
        saveNewRoutine(newRoutine)
    }

    return (
        <>
            <h1>Bienvenido {user.username}</h1>
            <h3>Rutinas <button onClick={() => setEditing(!editing)}>Agregar Rutina</button></h3>
            

            { editing && <RoutineEditor onSaveRoutine={handleSaveRoutine}/>}

            { routines.map( routine => {
                return (
                    <div>
                        <Link to={`/routines/${routine._id}`}>{routine.title}</Link>
                    </div>
                )
            })}
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
    return (
        <>
            <h4>Nueva Rutina</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Nombre</label>
                    <input type='text' name='title' value={newRoutine.title} onChange={handleChange}/>
                </div>

                <div><button type='submit'>Guardar</button></div>
            </form>
        </>
    )
}