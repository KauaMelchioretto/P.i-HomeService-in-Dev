import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import axios from "axios";
import { useSelector } from "react-redux";
import { allActions } from "../redux/actions";

export default function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();
  var cookieToken;
  var token = useSelector(
    ({
      rootReducer: {
        login: { token },
      },
    }) => token
  );

  async function sessionLogin() {
    cookieToken = await axios.get("http://localhost:3001/getcookie");
    const data = JSON.stringify(cookieToken.data.token);
    if (cookieToken.data.token != undefined) {
      token = data.replace(/[{}"]/g, "");
      dispatch(allActions.doSetLogin({token}));
      console.log(auth.user)

    }
  }

  if (!auth.user) {
    sessionLogin();
    if (!auth.user) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
  }
  return children;
}
