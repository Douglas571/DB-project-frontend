import { create } from "zustand";

const useStore = create((set, get) => ({
  user: {},
  routines: [],
  activity: [
    {
      routine_id: 0,
      exercise_id: 0,
      reps: [10, 8, 4],
    },
    {
      routine_id: 0,
      exercise_id: 0,
      reps: [10, 8, 4],
    },
    {
      routine_id: 0,
      exercise_id: 0,
      reps: [10, 8, 4],
    },
    {
      routine_id: 0,
      exercise_id: 1,
      reps: [5, 3, 1],
    },
  ],
  setUser: (user) => {
    set((_) => ({ user }));
  },
  getRoutine: (id) => {
    return get().routines.find((routine) => routine.id == id);
  },
  setRoutines: (routines) => {
    set((state) => ({ routines }));
  },
  updateRoutine: (routine, routine_id) => {
    let routines = get().routines;
    let idx = routines.findIndex((r) => r.id === routine_id);
    routines[idx] = routine;
    set((state) => ({ routines }));
  },
  getExercise: (routineID, exerciseID) => {
    const routine = get().routines.find(({ _id }) => _id === Number(routineID));
    const exercise = routine.exercises.find(
      ({ _id }) => _id === Number(exerciseID)
    );

    return exercise;
  },
  getActivity: (exerciseID) => {
    const activity = get().activity.filter(
      (act) => act.exercise_id === exerciseID
    );
    if (!activity) return [];

    return activity;
  },
}));

export default useStore;

// {
//   id: 0,
//   title: "Rutina de Pecho",
//   exercises: [
//     {
//       _id: 0,
//       name: "Flexiones",
//       sets: 3,
//       reps: [20, 15, 12],
//     },
//     {
//       _id: 1,
//       name: "Fondos",
//       sets: 3,
//       reps: [10, 8, 4],
//     },
//     {
//       _id: 2,
//       name: "Plancha",
//       sets: 3,
//       reps: [50, 30, 10],
//     },
//   ],
// },
// {
//   id: 1,
//   title: "Rutina de Piernas",
// },
// {
//   id: 2,
//   title: "Rutina de Espalda",
// },
// {
//   id: 3,
//   title: "Rutina de Estiramientos",
// },
