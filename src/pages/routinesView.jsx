import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import * as api from "@/util/api";
import useStore from '@/store'

export default function Routines () {
    const params = useParams()
    const routine = useStore( state => state.getRoutine(params.id) )
    const user = useStore( state => state.user )
    
    console.log({routine})

    async function handleNewExercise(newExercise) {
        newExercise.id = String(Date.now()),
        console.log({newExercise})

        let res = await api.saveExercise(newExercise, params.id)
        console.log(res)
    }

    let exercisesElements = routine?.exercises?.map( (exercise, idx) => {
            return (
                <div key={idx}>
                    <Link to={`exercise/${exercise._id}`}>{exercise.name}</Link>
                </div>
            )
        })

    if (!exercisesElements) {
        exercisesElements = <div>no hay ejercicios para esta rutina</div>
    }

    if(!routine) {
        return <h1>Esta rutina no existe</h1>
    }

    return (
        <div>
            <h1>{routine.title}</h1>

            <ExerviseEditor onSave={handleNewExercise}/>

            {
                exercisesElements
            }
        </div>
    )
}

function ExerviseEditor({onSave}) {
    const [newExercise, setNewExercise] = useState({
        name: 'push ups',
        unit: 'kg',
        sets: [
               { reps: 15, amount: 0 },
               { reps: 13, amount: 0},
               { reps: 8, amount: 0}
            ]
        }
    )

    useEffect(() => {
        if (newExercise.unit === 'sec') {
            setNewExercise({
                ...newExercise,
                sets: []
            })
        }
    }, [newExercise.unit])

    function handleChange(evt) {
        const { name, value } = evt.target
        setNewExercise({...newExercise, [name]: value})
    }

    function addNewRepetition(evt) {
        setNewExercise({...newExercise, sets: [
            ...newExercise.sets,
            {
                reps: 0,
                amount: 0 
            }
        ]})
    }

    function handleSetChange(evt) {
        const {id, value, name} = evt.target
        let newSets = [...newExercise.sets]

        newSets[id][name] = value

        setNewExercise({...newExercise, sets: [
            ...newSets
        ]})
    }

    function handleDeleteSet(idx) {
        let newSets = newExercise.sets.filter((_, i) => i !== idx)
        setNewExercise({...newExercise, sets: [
            ...newSets
        ]})
    }

    function handleSubmit(evt) {
        evt.preventDefault()

        onSave(newExercise)
    }

    return (<div>

        <h3>Nuevo Ejercicio</h3>
        <div>
            <div>
                <div>
                    <label>Nombre: </label>
                    <input type='text' name="name" value={newExercise.name} onChange={handleChange}/>
                </div>
                <div>
                    <label>Medidas: </label>          
                    <select value={newExercise.unit} name="unit" onChange={handleChange}>
                        <option value="sec">Seg</option>
                        <option value="kg">Kg</option>
                        <option value="lb">Lb</option>
                    </select>
                </div>
                <div>
                    <label>Repeticiones: </label>
                    { newExercise.sets.map(( set, idx ) => {
                        return (
                            <div key={idx}>
                                <div>
                                    <label>{"#"+idx}: </label>
                                    <input style={{width: "50px"}} type='number' name={"reps"} id={idx} value={set.reps} onChange={handleSetChange} disabled={newExercise.unit === 'sec'}/>
                                    <label> Peso/duración: </label>
                                    <input style={{width: "50px"}} type='number' name={"amount"} id={idx} value={set.amount} onChange={handleSetChange}/>
                                    <button onClick={() => handleDeleteSet(idx)}>Eliminar</button>
                                </div>
                            </div>
                        )
                    })}
                    <button onClick={addNewRepetition}>Agregar otra repetición</button>
                </div>
            </div>
            <button onClick={handleSubmit}>Guardar</button>
        </div>
    </div>)
}