import React, { useState } from "react";
import MenuBar from "../components/MenuBar";
import Axios from "axios";
import * as JSURL from "jsurl";

export default function UserRegister() {
  const [values, setValues] = useState({});

  const changeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const registerUser = () => {
    if (validation(values)) {
      Axios.post("http://localhost:3001/getEmailUsuario", {
        emailRegister: values.emailRegister,
      }).then((response) => {
        const data = JSURL.stringify(response.data);
        if (data != "~(~)") {
          window.alert("Email já cadastrado!");
        } 
        
        else {
          if (validation(values)) {
            Axios.post("http://localhost:3001/registroUsuario", {
              userName: values.userName,
              emailRegister: values.emailRegister,
              passwordRegister: values.passwordRegister,
            }).then((response) => {
              if (response) {
                setValues({
                  userName: "",
                  emailRegister: "",
                  passwordRegister: "",
                  passwordConfirmation: "",
                });
              } window.alert("Cadastrado com sucesso!")
            });
          }
        }
      });
    }
  };

  const validation = () => {
    var message = "";
    if (values.userName == "") {
      message += "Insira um nome de usuário!\n";
    }
    if (values.emailRegister == "") {
      message += "Insira um e-mail para cadastro!\n";
    }
    if (values.passwordRegister == "") {
      message += "Insira uma senha para cadastro!\n";
    }
    if (values.passwordConfirmation != values.passwordRegister) {
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
      <section className="register--section">
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
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              id="emailRegister"
              name="emailRegister"
              placeholder="Digite seu e-mail para cadastro"
              required="Text"
              onChange={changeValues}
              value={values.emailRegister}
            />
          </div>
          <div>
            <label>Senha</label>
            <input
              type="password"
              id="passwordRegister"
              name="passwordRegister"
              placeholder="Digite sua senha para cadastro"
              onChange={changeValues}
              value={values.passwordRegister}
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
            />
          </div>
        </form>
                  
        <div className="buttons">
          <button onClick={() => registerUser()}>Cadastrar-se</button>
          <button type="reset">Descartar</button>
        </div>
      </section>
    </div>
  );
}
