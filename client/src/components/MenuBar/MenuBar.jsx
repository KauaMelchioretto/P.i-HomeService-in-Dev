import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/auth";
import "./MenuBar.css";

export default function MenuBar() {
  const navigate = useNavigate();
  const token = useSelector(({rootReducer: {login : {token}}}) => token);
  const auth = useAuth();

  const withoutAuthentication = (
    <ul>
      <li>
        <button onClick={() => navigate("/inicio")} id="menu--items">
          Home
        </button>
      </li>
      <li>
        <button onClick={() => navigate("/login")} id="menu--items">
          Login
        </button>
      </li>
    </ul>
  );

  const withAuthentication = (
    <ul>
      <li>
        <button onClick={() => navigate("/inicio")} id="menu--items">
          Home
        </button>
      </li>
      <li>
        <button onClick={() => navigate("/registrosDeServicos")} id="menu--items">
          Cadastre seu serviço
        </button>
      </li>
      <li>
        <button onClick={() => auth.logout(token)} id="menu--items">
          Sair
        </button>
      </li>
    </ul>
  );
  return <nav id="menu--nav">{token ? withAuthentication : withoutAuthentication}</nav>;
}
