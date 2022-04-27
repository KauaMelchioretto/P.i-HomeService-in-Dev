import { React, useState } from "react";
import Search from "../img/search_icon.svg";
import List from "../img/list_icon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import "./InitScreen.css";
import Axios from "axios";
import * as JSURL from "jsurl";

export default function InitScreen() {
  const [values, setValues] = useState();
  const [listResults, setListResults] = useState();
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
    }).then ((response) => {
      const data = JSURL.stringify(response.data);
      navigate(`/resultados?professional=${data ?? ""}`);
    });
  };

  {
    return (
      <div>
        <header className="MainScreen--container">
          <h1 className="title">Home Service</h1>
          <input
            data-ls-module="charCounter"
            id="information"
            name="information"
            className="search--input"
            type="text"
            placeholder="Pesquise aqui!"
            maxLength={100}
            onChange={handleChangeValues}
          ></input>

          <button className="search--icon"
            onClick={() => SearchServices()}
          >
            <img src={Search} className="search--icon" alt="Search" />
          Buscar </button>

          <img src={List} className="list--icon" alt="Search" />
        </header>

        <div>
          <NavLink id="register--button" to="/registros">
            Cadastre seu serviço
          </NavLink>
        </div>

        <section className="fast--search">
          <NavLink id="button--search" to="/resultados">
            Encanador
          </NavLink>
          <NavLink id="button--search" to="/resultados">
            Eletricista
          </NavLink>
          <NavLink id="button--search" to="/resultados">
            Marceneiro
          </NavLink>
        </section>
      </div>
    );
  }
}
