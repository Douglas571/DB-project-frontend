import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useStore from '@/store'

export default function Exercises () {
    // TODO: Chenck when i don't have a exercise for the given id
    const params = useParams()
    console.group('routineExerciseView - root')
    console.log({params})
 
    
    const routines = useStore ( state => state.routines)
    let exercise = useStore ( state => state.getExercise(params.id, params.exerciseID))
    console.log({exercise, routines})

    console.groupEnd()   

    const activity = useStore (state => state.getActivity(exercise?.id))

    if (!exercise?.name) {
        return (<h1>Este ejercicio no existe</h1>)
    }

    return (
        <>
            <h1 data-test="exercise-name">Ejercicio { exercise.name }</h1>

            <div>
                { exercise.sets.map( (set, idx) => {
                    return (<div key={idx} data-test={`exercise-sets-${idx}`}>
                        <p>
                            <span data-test={`exercise-sets-${idx}-reps`}>reps: {set.reps}</span>
                            <br/>
                            <span data-test={`exercise-sets-${idx}-amount`}>reps: {set.amount}</span>
                        </p>
                    </div>)
                })}
            </div>
            <ActivityPanel exercise={exercise}/>
        </>);
}

function ActivityPanel({exercise}) {
    const [isAddingActivity, setIsAddingActivity] = useState(false)

    return (
        <div>
            <h3>Actividad</h3>
            { !isAddingActivity && 
                <button data-test="exercise-add-activity" onClick={() => setIsAddingActivity(!isAddingActivity)}>Agregar actividad</button>
            }

            { isAddingActivity &&
                <ActivityEditor exercise={exercise}/>
            }
                

            { !exercise?.activity 
                ? (<p>No hay actividad registrada</p>)
                : (<div>
                   {/* Agregar record de actividades aqui */}
                </div>)
            }

        </div>
    )
}

function ActivityEditor({exercise}) {
    console.group('ActivityEditor - root')
    console.log({exercise})
    console.groupEnd()

    return (
        <div>
            <label>Repeticiones: </label>
            { exercise?.sets?.map(( set, idx ) => {
                return (
                    <div key={idx}>
                        <div>
                            <label>{"#"+idx}: </label>
                            <input style={{width: "50px"}} type='number' 
                                name={"reps"} id={idx} value={set.reps} 
                                // onChange={handleSetChange} 
                                disabled={exercise.unit === 'sec'}
                                data-test={`newExercise-set-${idx}-reps`}/>
                            <label> Peso/duración: </label>
                            <input style={{width: "50px"}} type='number' 
                                name={"amount"} id={idx} value={set.amount} 
                                //onChange={handleSetChange}
                                data-test={`newExercise-set-${idx}-amount`}/>
                        </div>
                    </div>
                )
            })}
            <div>
                <button 
                    // onClick={addNewRepetition}
                    data-test="newExercise-new-set-button"
                >Registrar Actividad</button>
            </div>
        </div>
    )
}