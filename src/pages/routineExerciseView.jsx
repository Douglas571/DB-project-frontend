import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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
	const activity = useStore (state => state.activity)
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
			<ActivityPanel exercise={exercise} activity={activity} onNewRecord={handleNewActivityRecord}/>
		</>);
}

function ActivityPanel({exercise, activity, onNewRecord}) {
	const [isAddingActivity, setIsAddingActivity] = useState(false)

	console.log({activityPanel: activity})

	return (
		<div>
			<h3>Actividad</h3>
			{ !isAddingActivity && 
				<button data-test="exercise-add-activity" onClick={() => setIsAddingActivity(!isAddingActivity)}>Registrar Actividad</button>
			}

			{ isAddingActivity &&
				<ActivityEditor exercise={exercise} onNewRecord={onNewRecord}/>
			}
				

			{ !activity 
				? (<p>No hay actividad registrada</p>)
				: (<div>
				   {/* Agregar record de actividades aqui */}
						{ activity?.map( act => {
							console.log({act})
							return (
								<div>
									<p data-test={`activity-${act.id}`}>
									<span>{new Date(act.date).toLocaleString()}</span>
									<br/>
									{ act.sets.map((set, idx) => {
										return (
											<>
												<span data-test={`activity-${act.id}-set-${idx}`}>
													<span data-test={`activity-${act.id}-set-${idx}-number`}>{idx+1} </span>
													<span data-test={`activity-${act.id}-set-${idx}-reps`}>- reps: {set.reps}, </span>
													<span data-test={`activity-${act.id}-set-${idx}-amount`}>peso/duración: {set.amount}</span>
												</span><br/>
											</>
										)
									})}
									</p>
								</div>
							)
						})}
				</div>)
			}

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
								value={set.reps}
								onChange={(evt) => handleSetChange({evt, idx, type: 'reps'})}/>
							<label> Peso/duración: </label>
							<input style={{width: "50px"}} type='number' 
								name={"amount"} id={idx} value={set.amount} 
								//onChange={handleSetChange}
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