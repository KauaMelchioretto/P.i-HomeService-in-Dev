import React from "react";
import { useState } from "react";
import { Rating } from "primereact/rating";
import "./CardAvaliation.css"

export default function CardAvaliation(props) {
    const [setValue] = useState(0);
    return(
        <div className="card--avaliation">
            <h2>Nome do avaliador: {props.username}</h2>
            <p>Comentário: {props.comment}</p>
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