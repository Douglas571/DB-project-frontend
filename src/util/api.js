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
  if (!user?.username) {
    return { data: [], err: "there's not user" };
  }

  console.group("api.getRoutine");

  let res;
  let err;

  try {
    res = await axios.get(`${HOST}/routines`);
  } catch (e) {
    console.log({ e });
    err = e.response.data.detail;
  }

  let returnedData = {
    data: res.data.filter((r) => r.user_id === user.username),
    err,
  };

  //console.log({ res, returnedData });
  console.groupEnd();

  return returnedData;
}

export async function deleteRoutine(user, routine) {
  console.group("api.deleteRoutine");

  let res;
  let err;

  try {
    res = await axios.delete(`${HOST}/routines/${routine.id}`);
  } catch (e) {
    console.log({ e });
    err = e.response.data.detail;
  }

  let returnedData = {
    data: res.data.filter((r) => r.user_id === user.username),
    err,
  };

  //console.log({ res, returnedData });
  console.groupEnd();

  return returnedData;
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

console.log();

export async function saveActivity(activity) {
  console.group("API.saveActivity");
  let res;
  let toReturn;
  let toSend = activity;

  console.log({ toSend });

  try {
    res = await axios.post(`${HOST}/activities`, toSend);

    toReturn = { data: res.data };
  } catch (err) {
    console.log({ err });
    toReturn.err = e;
  }

  console.log({ toReturn });
  console.groupEnd();

  return toReturn;
}

export async function getActivities() {
  let toReturn = {};

  try {
    const res = await axios.get(`${HOST}/activities`);
    toReturn.data = res.data;
  } catch (err) {
    toReturn.err = err;
  }

  return toReturn;
}

export async function deleteActivity(activity) {
  let toReturn = {};

  try {
    const res = await axios.delete(`${HOST}/activities/${activity.id}`);
    toReturn.data = res.data;
  } catch (err) {
    toReturn.err = err;
  }

  return toReturn;
}
