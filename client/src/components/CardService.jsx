import React from "react";
import UserImage from "../img/eu.jpg";
import WppIcon from "../img/WppIcon.webp";
import { NavLink } from "react-router-dom";

export default function CardService(props) {
  {
    return (
      <div className="card--service">
        <div className="service--informations">
          <div className="content">
            <p>Nome: {props.name}</p>
            <p>Profissão: {props.profession}</p>
            <p>Cidade de atuação: {props.city}</p>
            <p>Cidade de atuação (SECUNDÁRIA): {props.city2}</p>
            <a
              className="wpp--number"
              target="_blank"
              href={`https://wa.me/${props.numberTel}`}
            >
              <img src={WppIcon} alt="" width="25px" /> {props.numberTel}
            </a>
            <p>Descrição: {props.description}</p>

            <button id="back--button" onClick={() => window.history.back()}>
              {" "}
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }
}
