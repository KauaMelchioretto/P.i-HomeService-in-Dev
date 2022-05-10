import React from "react";
import "../pages/ResultScreen.css";
import * as JSURL from "jsurl";
import { useNavigate } from "react-router-dom";

export default function CardResult(props) {
  const navigate = useNavigate();

  const seeMore = () => {
    const data = JSURL.stringify(props);
    navigate(`/servico?professional=${data ?? ""}`);
}

  console.log(props);
  { 
    return (
      <div className="card--container">
        <h1 className="card--name">Nome: {props.name}</h1>
        <p className="card--profession">Profissão: {props.profession}</p>
        <p className="card--city">Cidade: {props.city}</p>
        <button className="see--more" onClick={() => seeMore()}>
          ver mais...
        </button>
      </div>
    );
  }
}
