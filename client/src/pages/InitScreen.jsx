import { React, useState } from "react";
import Search from "../img/search_icon.svg";
import List from "../img/list_icon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import "./InitScreen.css";
import Axios from "axios";
import * as JSURL from "jsurl";

export default function InitScreen() {
  const [values, setValues] = useState({});
  const navigate = useNavigate();

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const SearchServices = () => {
    Axios.post("http://localhost:3001/resultados", {
      information: values.information,
    }).then((response) => {
      const data = JSURL.stringify(response.data);
      if (data != "~'" && data != "~(~)") {
        navigate(`/resultados?professional=${data ?? ""}`);
      } else {
        window.alert("Insira uma informação para pesquisa!");
      }
    });
  };

  const SearchServicesVoid = (param) => {
    Axios.post("http://localhost:3001/resultados", {
      information: param,
    }).then((response) => {
      const data = JSURL.stringify(response.data);
      data != "~(~)"
        ? navigate(`/resultados?professional=${data ?? ""}`)
        : window.alert("Sem resultados");
    });
  };

  {
    return (
      <div className="container">
        <header className="header--container">
          <h1 className="title">Home Service</h1>
          <input
            className="search--input"
            data-ls-module="charCounter"
            id="information"
            name="information"
            type="text"
            placeholder="Pesquise aqui!"
            maxLength={100}
            onChange={handleChangeValues}
          ></input>

          <button
            className="search--icon"
            onClick={() => SearchServices()}
          ></button>

          <button className="list--icon" alt="search"></button>
        </header>

        <div>
          <NavLink id="register--button" to="/registros">
            Cadastre seu serviço
          </NavLink>
        </div>

        <section className="fast--search">
          <h1>Busca Rápida</h1>

          <button
            id="fast-button-search"
            onClick={() => SearchServicesVoid("Encanador")}
            to="/resultados"
            value={2}
          >
            Encanador
          </button>
          <button
            id="fast-button-search"
            onClick={() => SearchServicesVoid("Eletrecista")}
            to="/resultados"
          >
            Eletricista
          </button>
          <button
            id="fast-button-search"
            onClick={() => SearchServicesVoid("Marceneiro")}
            to="/resultados"
          >
            Marceneiro
          </button>
        </section>
      </div>
    );
  }
}
