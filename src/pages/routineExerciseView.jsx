import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors
  } from 'chart.js';
import { faker } from '@faker-js/faker';

import * as api from "@/util/api";

import useStore from '@/store'

export default function Exercises () {
	// TODO: Chenck when i don't have a exercise for the given id
	const params = useParams()
	const routine_id = params.id
	const exercise_id = params.exerciseID

	console.group('routineExerciseView - root')
	// console.log({params})
	
	const routines = useStore ( state => state.routines)
	const exercise = useStore ( state => state.getExercise(params.id, params.exerciseID))
	const activity = useStore (state => state.getActivity(exercise?.id))
	const setActivity = useStore( state => state.setActivity)
	// console.log({exercise, routines})

	console.log({activitieRoutineView: activity})
	console.groupEnd()

	

	if (!exercise?.name) {
		return (<h1>Este ejercicio no existe</h1>)
	}

	async function handleNewActivityRecord(newActivity) {
		console.group('routineExerciseView - handleNewActivityRecord')
		console.log({exercise})
		newActivity.routine_id = routine_id
		newActivity.exercise_id = exercise_id
		newActivity.date = new Date()
		console.log({newActivity})

		let res = await api.saveActivity(newActivity)
		console.log({res})
		setActivity(res.data)

		console.groupEnd()
		
	}

    async function handleDeleteRecord(activity) {
        console.log({deteleThis: activity})
        let res = await api.deleteActivity(activity)

        setActivity(res.data)
    }

	return (
		<>
			<h1 data-test="exercise-name">Ejercicio { exercise.name }</h1>
			<ActivityPanel 
                exercise={exercise} 
                activity={activity} 
                onNewRecord={handleNewActivityRecord}
                onDeleteRecord={handleDeleteRecord}/>
		</>);
}
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

function ActivityPanel({exercise, activity, onNewRecord, onDeleteRecord}) {
	const [isAddingActivity, setIsAddingActivity] = useState(false)

    function handleNewRecord(newRecord){
        onNewRecord(newRecord)
        setIsAddingActivity(false)
    }

  
    let labels
    let data
    if (activity.length) {
        labels = activity.map( act => new Date(act.date).toLocaleString());
        data = {
            labels,
            datasets: activity[0].sets.map((_, setIdx) => {
                return ({
                    label: `set #${setIdx + 1}`,
                    data: activity.map( act => (act.sets[setIdx].reps)),
                })
            })
        }
    }


    
	return (
		<div>
			<h3>Actividad</h3>
			{ !isAddingActivity && 
                <>
                    <div>
                        <button data-test="exercise-add-activity" onClick={() => setIsAddingActivity(!isAddingActivity)}>Registrar Actividad</button>
                        
                    </div>
                    <br/>
                </>
			}

			{ isAddingActivity &&
				<>
                    <ActivityEditor exercise={exercise} onNewRecord={handleNewRecord}/>
                    <br/>
                </>
			}

            

			{ !activity 
				? (<p>No hay actividad registrada</p>)
				: (<div data-test="activity-list">
				   {/* Agregar record de actividades aqui */}


                   <table border="1" style={{textAlign: "center"}}>
                    <thead>
                        <tr>
                            <th rowSpan={2}>Fecha</th>
                            <th colspan={exercise.sets.length}>repeticiones</th>
                            <th colspan={exercise.sets.length}>peso/duración</th>
                            <th rowSpan={3}></th>
                        </tr>
                        <tr>
                            
                            {exercise.sets.map((_, i ) => (<th>{i+1}</th>))}
                            {exercise.sets.map((_, i ) => (<th>{i+1}</th>))}
                        </tr>
                    </thead>
                    <tr>
                        <td>OBJETIVO</td>
                        { exercise.sets.map( (set, idx) => (
                            <td data-test={`exercise-sets-${idx}-reps`}>{set.reps}</td>
                        ))}
                        { exercise.sets.map( (set, idx) => (
                            <td data-test={`exercise-sets-${idx}-amount`}>{set.amount}</td>
                        ))}
                        <td></td>
                        
                    </tr>
                    { activity?.toReversed().map((act, rowIdx) => {
						return (
							<tr data-test={`activity-${rowIdx}`}>
								<td>{new Date(act.date).toLocaleString()} </td>
                                    
                                    {/* print the reps */}
                                { act.sets.map((set, idx) => (<td data-test={`activity-${rowIdx}-set-${idx}-reps`}>{set.reps}</td>))}
                                { act.sets.map((set, idx) => (<td data-test={`activity-${rowIdx}-set-${idx}-amount`}>{set.amount}</td>))}
                                <td>
                                    <button data-test={`activity-${rowIdx}-delete-button`}
                                        onClick={() => onDeleteRecord(act)}>
                                            Eliminar
                                    </button>
                                </td>
                            </tr>)
					})}
                    <tr>
                        
                    </tr>
                   </table>
				</div>)
			}


            { activity.length && (
                <Line 
                options={options}
                data={data}
            />
            )}
		</div>
	)
}

function ActivityEditor({exercise, onNewRecord}) {
	const [newActivityRecord, setNewActivityRecord] = useState({
		sets: exercise.sets.map( set => ({ reps: 0, amount: 0}))
	})

	// console.group('ActivityEditor - root')
	// console.log({exercise, newActivityRecord})
	// console.groupEnd()

	function handleSetChange({ evt, idx, type}) {
		const newState = { ...newActivityRecord }

		newState.sets[idx][type] = Number(evt.target.value)
		
		setNewActivityRecord(newState)
	}

	function handleSaveRecord() {
		
		onNewRecord(newActivityRecord)
        setNewActivityRecord({
            sets: exercise.sets.map( set => ({ reps: 0, amount: 0}))
        })
	}

	return (
		<div>
			<label>Repeticiones: </label>
			{ newActivityRecord?.sets?.map(( set, idx ) => {
				return (
					<div key={idx}>
						<div>
							<label>{"#"+idx}: </label>
							<input style={{width: "50px"}} type='number' 
								name={"reps"} id={idx}
								// onChange={handleSetChange} 
								disabled={exercise.unit === 'sec'}
								data-test={`new-activity-set-${idx}-reps`}
								// value={set.reps}
                                placeholder='0'
								onChange={(evt) => handleSetChange({evt, idx, type: 'reps'})}/>
							<label> Peso/duración: </label>
							<input style={{width: "50px"}} type='number' 
								name={"amount"} id={idx} 
                                // value={set.amount} 
								//onChange={handleSetChange}
                                placeholder='0'
								data-test={`new-activity-set-${idx}-amount`}
								onChange={(evt) => handleSetChange({evt, idx, type: 'amount'})}/>
						</div>
					</div>
				)
			})}
			<div>
				<button 
					// onClick={addNewRepetition}
					data-test="new-activity-save-button"
					onClick={handleSaveRecord}
				>Guardar Record</button>
			</div>
		</div>
	)
}