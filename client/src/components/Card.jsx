import React from "react";
import "./Card.css";

export default function Card(props)
{
    return(
        <div className="card--container">
            <h1 className="card--name">Nome: {props.name}</h1>
            <p className="card--profession">Profissão: {props.profession}</p>
            <p className="card--city">Cidade: {props.city}</p>
            <p className="card--city">Cidade(secundária): {props.city2}</p>
            <p className="card--numberTel">Número de telefone: {props.numberTel}</p>
            <p className="card--description">Descrição: {props.description}</p>
        </div>
    );
}