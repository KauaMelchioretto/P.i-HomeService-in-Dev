import React, { useState } from "react";
import MenuBar from "../menubar/MenuBar";
import Axios from "axios";
import "./Forms.css";
import * as JSURL from "jsurl";
import { registerUser, verifyUserEmail } from "../../services/registers/Registers";
export default function UserRegister() {
  const [values, setValues] = useState({});

  const changeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickRegisterUser = async () => {
    if(validation(values)){
    const userName = values.userName;
    const email = values.email;
    const password = values.password;
    const verify = await verifyUserEmail(email);
    verify == false ? window.alert("Email já cadastrado!") : await registerUser(userName, email, password); 
     clearInputs();
    }
  }

 const clearInputs = () => {
    setValues({
      userName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      handleClickRegisterUser();
    }
  };

  const validation = () => {
    var message = "";
    if (values.userName == "") {
      message += "Insira um nome de usuário!\n";
    }
    if (values.email == "") {
      message += "Insira um e-mail para cadastro!\n";
    }
    if (values.password == "") {
      message += "Insira uma senha para cadastro!\n";
    }
    if (values.passwordConfirmation != values.password) {
      message += "As senhas não correspondem!\n";
    }
    if (message != "") {
      window.alert(message);
      return false;
    }
    return true;
  };

  return (
    <div>
      <MenuBar />
      <header className="header--container">
        <h1>Home Service</h1>
        <h2>Registre sua conta aqui!</h2>
      </header>
      <section className="userForm--section">
        <form>
          <div>
            <label>Nome</label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Digite seu nome"
              required="Text"
              onChange={changeValues}
              value={values.userName}
              className="input--field"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Digite seu e-mail para cadastro"
              required="Text"
              onChange={changeValues}
              value={values.email}
              className="input--field"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div>
            <label>Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha para cadastro"
              onChange={changeValues}
              value={values.password}
              className="input--field"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div>
            <label>Digite sua senha novamente</label>
            <input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="Cofirmação de senha"
              onChange={changeValues}
              value={values.passwordConfirmation}
              className="input--field"
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="buttons">
            <button className="register--button" type="button" onClick={() => handleClickRegisterUser()}>Cadastrar-se</button>
            <button className="register--button" type="reset" onClick={() => clearInputs()}>Descartar</button>
          </div>

        </form>
      </section>
    </div>
  );
}
