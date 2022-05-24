import React, { useState } from "react";
import MenuBar from "../components/MenuBar";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";
import * as JSURL from "jsurl";

export default function Login() {
  const [values, setValues] = useState({});
  const navigate = useNavigate();

  const changeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      const data = JSURL.stringify(response.data);
      data != "~(~)"
        ? navigate(`/inicio?usuario=${data ?? ""}`)
        : window.alert("E-mail ou senha não correspondem!");
    });
  }


  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      login();
    }
  };

  return (
    <div>
        <MenuBar/>
      <section className="register--section">
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
            />
          </div>
          <NavLink to="/registroUsuario">Registrar-se</NavLink>
        </form>
        <div className="buttons">
          <button onClick={() => login()}>kkkkkkkkkkkkkkkkkk</button>
        </div>
      </section>
    </div>
  );
}
