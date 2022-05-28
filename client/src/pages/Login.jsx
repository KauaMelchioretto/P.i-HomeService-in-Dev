import React, { useState } from "react";
import MenuBar from "../components/MenuBar";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Forms.css";
import * as JSURL from "jsurl";
import useQueryParam from "../hooks/useQueryParam";

export default function Login() {
  const [values, setValues] = useState({});
  const [userInformations] = useQueryParam("usuario");
  const navigate = useNavigate();

  const changeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const userIsLoged = () => {
    if (userInformations != null) return true;
    else return false;
  };

  const login = () => {
    if (userIsLoged()) window.alert("Você já está conectado à sua conta!");
    else
      Axios.post("http://localhost:3001/login", {
        email: values.email,
        password: values.password,
      }).then((response) => {
        const data = JSURL.stringify(response.data);
        data != "~(~)"
          ? navigate(`/inicio?usuario=${data ?? ""}`)
          : window.alert("E-mail ou senha não correspondem!");
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      login();
    }
  };

  return (
    <div className="container">
      <MenuBar />
      <header className="header--container">
        <h1>Home Serivce</h1>
        <h2>Login</h2>
      </header>
      <section className="userForm--section">
        <form>
          <label htmlFor="email">E-mail</label>
          <div>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Insira seu e-mail"
              required="Text"
              onChange={changeValues}
              onKeyDown={handleKeyDown}
              className="input--field"
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Insira sua senha"
              onChange={changeValues}
              onKeyDown={handleKeyDown}
              className="input--field"
            />
          </div>
          <NavLink to="/registroUsuario">Registrar-se</NavLink>
          <div className="buttons">
            <button
              className="custom--button"
              type="button"
              onClick={() => login()}
            >
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
