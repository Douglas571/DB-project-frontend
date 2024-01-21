import { Link, useParams } from 'react-router-dom';

import useStore from '@/store'

export default function Routines () {
    const params = useParams()
    const routine = useStore( state => state.getRoutine(params.id) )
    

    const exercisesElements = routine.exercises ? 
        routine.exercises.map( exercise => {
            return (
                <div>
                    <Link to={`exercise/${exercise._id}`}>{exercise.name}</Link>
                </div>
            )
        })
        : (<div>no hay ejercicios para esta rutina</div>)

    return (
        <>
            <h1>{routine.title}</h1>
            {
                exercisesElements
            }
        </>
    )
}