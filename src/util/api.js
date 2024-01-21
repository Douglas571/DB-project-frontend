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

export async function saveNewRoutine(newRoutine) {
  // create the routine axios code...
}
// TODO: Develope the loging singIn features
