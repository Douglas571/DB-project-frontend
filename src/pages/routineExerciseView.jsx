import { Link, useParams } from 'react-router-dom';

import useStore from '@/store'

export default function Exercises () {

    // TODO: Chenck when i don't have a exercise for the given id
    const params = useParams()
    const exercise = useStore ( state => state.getExercise(params.id, params.exerciseID))

    if (exercise?._id === undefined) {
        return (<h1>Este ejercicio no existe</h1>)
    }

    const activity = useStore (state => state.getActivity(exercise._id))

    const activityElements = activity.length > 0 
        ? activity.map( act => {
            console.log({act})
            return (
                <p>sets: {act.sets}
                    <br/>
                    reps: {act.reps.join(', ')}
                </p>
            )
        })
        : "no hay estadisticas para este ejercicio"

    return (
        <>
            <h1>{exercise.name}</h1>
            <p>
                sets: {exercise.sets}
                <br/>
                reps: {exercise.reps.join(', ')}
            </p>

            <button>Agregar Actividad</button>

            <h3>Actividad</h3>
            {activityElements}
        </>);
}