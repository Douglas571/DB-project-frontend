import { create } from "zustand";

import * as api from "@/util/api";

const useStore = create((set, get) => ({
  user: {},
  routines: [
    {
      _id: 0,
      title: "Rutina de Pecho",
      exercises: [
        {
          _id: 0,
          name: "Flexiones",
          sets: 3,
          reps: [20, 15, 12],
        },
        {
          _id: 1,
          name: "Fondos",
          sets: 3,
          reps: [10, 8, 4],
        },
        {
          _id: 2,
          name: "Plancha",
          sets: 3,
          reps: [50, 30, 10],
        },
      ],
    },
    {
      _id: 1,
      title: "Rutina de Piernas",
    },
    {
      _id: 2,
      title: "Rutina de Espalda",
    },
    {
      _id: 3,
      title: "Rutina de Estiramientos",
    },
  ],
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
    console.log({ user });
    console.log({ userInit: user });
  },
  getRoutine: (id) => {
    return get().routines.find((routine) => routine._id === Number(id));
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

  saveNewRoutine: async (newRoutine) => {
    console.log({ newRoutine, user: get().user.username });

    // const res = await api.saveRoutine(newRoutine, get().user.username);
    // TODO: Search for the userID and save the routine

    // set((state) => ({ routines: res.routines }));
  },
}));

export default useStore;
