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
  store.dispatch(allActions.doSetLogin({token}));
}

export async function logout({ token }) {
  try {
    await httpAgent.get(`/logout?token${token}`);
  } catch (error) {
    console.log("[Error] - logout", error);
    return false;
  }
  return true;
}
