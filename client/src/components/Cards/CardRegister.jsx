import React from "react";
import "./CardRegister.css";

export default function Card(propsCard)
{
    return(
        <div className="card--container">
            <h1 className="card--name">Nome: {propsCard.name}</h1>
            <p className="card--profession">Profissão: {propsCard.profession}</p>
            <p className="card--city">Cidade: {propsCard.city}</p>
            <p className="card--city">Cidade(secundária): {propsCard.city2}</p>
            <p className="card--numberTel">Número de telefone: {propsCard.numberTel}</p>
            <p className="card--description">Descrição: {propsCard.description}</p>
        </div>
    );
}