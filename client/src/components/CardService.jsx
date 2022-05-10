import React from "react";
import UserImage from "../img/eu.jpg";
import WppIcon from "../img/WppIcon.webp";
import { NavLink } from "react-router-dom";

export default function CardService(props) {
  // const linkWhatsapp = props.numberTel;
  
  // const SendMessageByWhatsapp = () => {
  //   linkWhatsapp = `wa.me/${props.numberTel}`;
    
  // }

  {
    return (
      <div>
        <div className="service--container">
          <div className="service--informations">
            <img className="img--user" src={UserImage} alt="" />
            <p>Nome: {props.name}</p>
            <p>Profissão: {props.profession}</p>
            <p>Cidade de atuação: {props.city}</p>
            <p>Cidade de atuação (SECUNDÁRIA): {props.city2}</p>
            <p>Whatsapp : {props.numberTel}</p>
            <p>Descrição: {props.description}</p>
            <NavLink className="Wpp--btn" to="">
              {" "}
              <img src={WppIcon} alt="" width="25px" />{" "}
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
