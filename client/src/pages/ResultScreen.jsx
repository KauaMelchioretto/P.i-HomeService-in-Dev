import { React, useEffect, useState } from "react";
import "./ResultScreen.css";
import UserImage from "../img/eu.jpg";
import { NavLink } from "react-router-dom";
import WppIcon from "../img/WppIcon.webp";
import CardResult from "../components/Card";
import Axios from 'axios'

export default function ResultScreen() {

  const [listResults, setListResults] = useState();


  useEffect(() => {
    Axios.get("http://localhost:3001/getResultados").then((response) => {
        setListResults(response.data);
      });
      // return () => clearsetListResults(setListResults);
  }, [listResults]);


  return (
    <div>
      <header className="header--container">
        <h1 className="title">Home Service</h1>
      </header>

      <div className="subtitle">
        <h1>Resultados</h1>
      </div>

      <div className="result--information">
        {typeof listResults !== "undefined" && listResults.map((value) => {
          return <CardResult key={value.id} listCard={listResults} setListResults={setListResults}
            id={value.id}
            name={value.name}
            profession={value.profession}
            city={value.city}
          >
          </CardResult>;
        })}
      </div>

      <div className="result--information">
        <img className="img--user" src={UserImage} />

        <div className="informations">
          <p>Profissão: Profissão</p>
          <p>Nome: Nome do profissional.</p>
          <p>
            Endereço de atuação: Endereço onde o serviço está sendo prestado.
          </p>
          <p>
            <img src={WppIcon} width="20px" alt="" /> 9999999
          </p>
          <NavLink className="see--more" to="/servico">
            Ver Mais
          </NavLink>
        </div>
      </div>
    </div>
  );
};
