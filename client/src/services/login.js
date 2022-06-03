import Axios from "axios";
import { allActions } from "../redux/actions";
import store from "../redux/store/index";

var httpAgent = Axios.create({
  baseURL: "http://localhost:3001/",
});

export async function login(email, password) {
  const {
    data: { token },
  } = await httpAgent.post("http://localhost:3001/login", {
    email,
    password,
  });
  return token;
}

export async function logout({ token }) {
  try {
    store.dispatch(allActions.doResetLogin({token}))
  } catch (error) {
    console.log("[Error] - logout", error);
    return false;
  }
  return true;
}
