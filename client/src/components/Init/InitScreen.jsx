import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./InitScreen.css";
import Axios from "axios";
import MenuBar from "../menubar/MenuBar";
import * as JSURL from "jsurl";
import { useSelector } from "react-redux";
import { getUserName } from "../../services/registers/Registers";
import { login } from "../../services/login";

export default function InitScreen() {
  const [values, setValues] = useState({});
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const token = useSelector(
    ({
      rootReducer: {
        login: { token },
      },
    }) => token
  );

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
      if (data == "~'") {
        window.alert("Insira uma informação para pesquisa!");
      } else if (data == "~(~)") {
        window.alert("Sem resultados!");
      } else {
        navigate(`/resultados?professional=${data ?? ""}`);
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
        : window.alert("Sem resultados!");
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      SearchServices();
    }
  };

  useEffect(async () => {
    if (token != undefined) {
      var username = await getUserName(token);
      setUser(username);
    } else setUser("");
  });

  {
    return (
      <div className="container">
        <MenuBar></MenuBar>
        <header className="header--container">
          <h1 className="title">Home Service</h1>
          <h2>Bem vindo {user} !</h2>
          <input
            className="search--input"
            data-ls-module="charCounter"
            id="information"
            name="information"
            type="textfield"
            placeholder="Pesquise aqui!"
            maxLength={100}
            onChange={handleChangeValues}
            onKeyDown={handleKeyDown}
          ></input>

          <button
            className="search--icon"
            onClick={() => SearchServices()}
          ></button>
        </header>

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
