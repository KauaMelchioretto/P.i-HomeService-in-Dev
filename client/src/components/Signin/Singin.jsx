import React, { useState } from "react";
import MenuBar from "../MenuBar/MenuBar";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../services/login"
import "../Registers/Forms.css";
import { useSelector } from "react-redux";

export default function Singin({ callback }) {
  const [values, setValues] = useState({});

  const handleClick = async () => {
    const email = values.email;
    const password = values.password;
    const token = await login(email, password);
    callback(token);
  }

  const changeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      handleClick();
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
              onClick={() => handleClick()}
            >
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
