import React from "react";
import UserImage from "../img/eu.jpg";
import WppIcon from "../img/WppIcon.webp";

export default function CardService(props) {
  {
    return (
      <div>
        <div className="service--informations">
          <p>Nome: {props.name}</p>
          <p>Profissão: {props.profession}</p>
          <p>Cidade de atuação: {props.city}</p>
          <p>Cidade de atuação (SECUNDÁRIA): {props.city2}</p>
          <a target="_blank" href={`https://wa.me/${props.numberTel}`}>
            <img src={WppIcon} alt="" width="25px" /> {props.numberTel}
          </a>
          <p>Descrição: {props.description}</p>
        </div>
      </div>
    );
  }
}
