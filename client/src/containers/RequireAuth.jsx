import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export default function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
      return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}
