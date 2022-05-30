import React from "react";
import "./MenuBar.css";
import useQueryParam from "../hooks/useQueryParam";
import * as JSURL from "jsurl";
import { NavLink, useNavigate } from "react-router-dom";

export default function MenuBar() {
  const [userInformations] = useQueryParam("usuario");
  const navigate = useNavigate();

  const toPage = (param, accessToken) => {
    if(userIsLoged()){
      const data = JSURL.stringify(userInformations);
      if(param == "inicio"){
        navigate(`/${param}?usuario=${data ?? ""}`);
      } else if (param == "registros") {
        navigate(`/${param}?usuario=${data ?? ""}`);
      } else if (param == "login") {
        navigate(`/${param}?usuario=${data ?? ""}`);
      } else if (param == "sair") {
        window.alert("Desconectado com sucesso!");
        navigate(`/inicio`);
      } else if (param == "login") {
        navigate(`/${param}?usuario=${data ?? ""}`);
      }
      
    } else if (param == "inicio"){
      navigate(`/${param}`);
    } else if (param == "login") {
      navigate(`/${param}`);
    } else {
      window.alert("É necessário estar conectado para acessar esta atividade!")
    }
  };

  const userIsLoged = () => {
    if (userInformations != null) 
      return true;
      else
    return false;
  }

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
