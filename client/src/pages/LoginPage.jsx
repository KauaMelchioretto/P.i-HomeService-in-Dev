import React from "react";
import { useNavigate } from "react-router-dom";
import Singin from "../components/singin/Singin.jsx";
import { useAuth } from "../hooks/auth.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  function onLogin(token) {
    auth.login( token ,() => navigate("/inicio", { replace: true }))
  }

  return (
    <div>
      <Singin callback={onLogin} />
    </div>
  );
}
