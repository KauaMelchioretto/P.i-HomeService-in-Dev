import React from "react";
import { useState } from "react";
import { Rating } from "primereact/rating";

export default function CardAvaliation(props) {
    const [setValue] = useState(0);
    return(
        <div className="card--container">
            <h2> Id de Avaliação: {props.idavaliation}</h2>
            <h2>Nome do avaliador: {props.username}</h2>
            <p>{props.comment}</p>
            <div className="Rating--bar">
            <Rating
              value={props.avaliation}
              cancel={false}
              onChange={(e) => setValue(e.value)}
              stars={props.avaliation}
            />
          </div>
        </div>
    );
}