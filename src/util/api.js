import axios from "axios";

const HOST = "http://127.0.0.1:8000";

export async function singUp(newUser) {
  const res = await axios.post(`${HOST}/singup`, {
    username: newUser.username,
    password: newUser.password,
  });

  console.log({ res });

  return res.data;
}

export async function singin(credentials) {
  const res = await axios.post(`${HOST}/singin`, {
    ...credentials,
  });

  return { ...res.data };
}

export async function addNewRoutine(user, newRoutine) {
  let data;
  let res;
  let err;

  console.log({ newRoutine });

  try {
    res = await axios.post(`${HOST}/routines`, {
      user_id: user.username,
      ...newRoutine,
    });
    data = res.data.routines;
  } catch (error) {
    console.log({ error });

    err = error.response.data.detail;
  }

  console.log({ addNewRouteRes: res });

  return { data, err };
}

export async function getRoutines(user) {
  let res;
  let err;

  try {
    res = await axios.get(`${HOST}/routines`);
  } catch (e) {
    console.log({ e });
    err = e.response.data.detail;
  }

  console.log({ routineAPI: res });

  return { data: res.data, err };
}

export async function saveExercise(newExercise, routine_id) {
  let res;
  let err;

  try {
    res = await axios.post(
      `${HOST}/routines/${routine_id}/exercises`,
      newExercise
    );
  } catch (e) {
    console.log({ e });
    err = e.response.data.detail;
  }

  console.log({ routineAPI: res });

  return { data: res.data, err };
}
