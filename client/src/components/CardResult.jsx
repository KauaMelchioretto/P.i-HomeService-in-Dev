import React from "react";
import "../pages/ResultScreen.css";
import { NavLink } from "react-router-dom";

export default function CardResult(props) {
    
  console.log(props);
  {
    return (
      <div className="card--container">
        <h1 className="card--name">Nome: {props.name}</h1>
        <p className="card--profession">Profissão: {props.profession}</p>
        <p className="card--city">Cidade: {props.city}</p>
        <NavLink className="see--more" to="/servico">
          ver mais...
        </NavLink>
      </div>
    );
  }
}
