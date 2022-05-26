import React from "react";
import "./MenuBar.css";
import useQueryParam from "../hooks/useQueryParam";
import * as JSURL from "jsurl";
import { NavLink, useNavigate } from "react-router-dom";

export default function MenuBar() {
  const [userInformations] = useQueryParam("usuario");
  const navigate = useNavigate();

  const toPage = (param) => {
    if (param == "inicio" && userInformations != null) {
      const data = JSURL.stringify(userInformations);
      navigate(`/${param}?usuario=${data ?? ""}`);
    } else if (param == "inicio") {
      navigate(`/inicio`);

    } else if (param == "registros" && userInformations != null) {
      const data = JSURL.stringify(userInformations);
      navigate(`/${param}?usuario=${data ?? ""}`);
    } else if (param == "registros") {
    window.alert("É necessário fazer login para acessar a seção de Registros!!");
    }

     else if (param == "login" && userInformations != null) {
      const data = JSURL.stringify(userInformations);
      navigate(`/${param}?usuario=${data ?? ""}`);
    } else if (param == "login") {
      navigate(`/login`);

    } else if (param == "sair" && userInformations != null) {
        window.alert("Desconectado com sucesso!");
        navigate(`/inicio`);
    } else if (param == "sair") {
        window.alert("Você não está conectado à sua conta!");
    } 
  };

  return (
    <nav id="menu--nav">
      <ul>
        <li>
          <button onClick={() => toPage("inicio")} id="menu--items">
            Home
          </button>
        </li>
        <li>
          <button onClick={() => toPage("registros")} id="menu--items">
            Cadastre seu serviço
          </button>
        </li>
        <li>
          <button onClick={() => toPage("login")} id="menu--items">
            Login
          </button>
        </li>
        <li>
          <button onClick={() => toPage("sair")} id="menu--items">
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
}
