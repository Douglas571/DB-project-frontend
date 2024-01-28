import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import * as api from "@/util/api";
import useStore from '@/store'

export default function Routines () {
	const params = useParams()
	const routine = useStore( state => state.getRoutine(params.id) )
	const user = useStore( state => state.user )

	const updateRoutine = useStore( state => state.updateRoutine )
	
	console.log({routine})

	async function handleNewExercise(newExercise) {
		newExercise.id = String(Date.now()),
		console.log({newExercise})

		let res = await api.saveExercise(newExercise, params.id)
		console.log(res)

		updateRoutine(res.data.routine, routine.id)
	}

	let exercisesElements = routine?.exercises?.map( (exercise, idx) => {
		console.group('routineView - maping exercises')
		console.log({exercise})
		console.groupEnd()
			return (
				<div key={idx} >
					<Link to={`exercise/${exercise.id}`}
						data-test={`routineView-exercise-${exercise.name}`}>{exercise.name}</Link>
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
			<h1 data-test="routine-title">{routine.title}</h1>

			<ExerviseEditor onSave={handleNewExercise}/>

			<div data-test="routine-exercises-list">
				{exercisesElements}
			</div>
		</div>
	)
}

function ExerviseEditor({onSave}) {
	const [newExercise, setNewExercise] = useState({
		name: '',
		unit: 'kg',
		sets: []
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
		setNewExercise({ name: '', sets: []})
	}

	return (<div>

		<h3>Nuevo Ejercicio</h3>
		<div>
			<div>
				<div>
					<label>Nombre: </label>
					<input type='text' 
						name="name" value={newExercise.name}
						onChange={handleChange}
						data-test="newExercise-name"/>
				</div>
				<div>
					<label>Medidas: </label>          
					<select value={newExercise.unit} 
						name="unit" 
						onChange={handleChange}
						data-test="newExercise-unit">
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
									<input style={{width: "50px"}} type='number' 
										name={"reps"} id={idx} value={set.reps} 
										onChange={handleSetChange} 
										disabled={newExercise.unit === 'sec'}
										data-test={`newExercise-set-${idx}-reps`}/>
									<label> Peso/duración: </label>
									<input style={{width: "50px"}} type='number' 
										name={"amount"} id={idx} value={set.amount} 
										onChange={handleSetChange}
										data-test={`newExercise-set-${idx}-amount`}/>
									<button onClick={() => handleDeleteSet(idx)}
									>Eliminar</button>
								</div>
							</div>
						)
					})}
					<button onClick={addNewRepetition} data-test="newExercise-new-set-button">Agregar otra repetición</button>
				</div>
			</div>
			<button onClick={handleSubmit} data-test="newExercise-save-button">Guardar</button>
		</div>
	</div>)
}