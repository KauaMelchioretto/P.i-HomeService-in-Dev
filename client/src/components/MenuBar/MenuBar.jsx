import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/auth";
import axios from "axios";
import "./MenuBar.css";

axios.defaults.withCredentials = true;

export default function MenuBar() {
  const navigate = useNavigate();
  var token = useSelector(
    ({
      rootReducer: {
        login: { token },
      },
    }) => token
  );
  const auth = useAuth();
  var cookieToken;

  const onLogout = async () => {
    var res = axios.get("http://localhost:3001/clearcookie");
    auth.logout(token);
    navigate("/inicio");
  };
  
  //Realize login to stay session.
  useEffect(async () => {
    if (auth.user == null) {
      cookieToken = await axios.get("http://localhost:3001/getcookie");
      const data = JSON.stringify(cookieToken.data.token);
      if (cookieToken.data.token != undefined) {
        token = data.replace(/[{}"]/g, "");
        auth.login(token);
      }
    }
  });

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
        <button
          onClick={() => navigate("/registrosDeServicos")}
          id="menu--items"
        >
          Cadastre seu serviço
        </button>
      </li>
      <li>
        <button onClick={() => onLogout()} id="menu--items">
          Sair
        </button>
      </li>
    </ul>
  );
  return (
    <nav id="menu--nav">
      {token ? withAuthentication : withoutAuthentication}
    </nav>
  );
}
