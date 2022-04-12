import React, { useState } from "react";
import "./RatingScreen.css";
import { Rating } from "primereact/rating";

const labels = {
  1: "muito ruim",
  2: "ruim",
  3: "mediano",
  4: "bom",
  5: "muito bom",
};

export default function RatingScreen() {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  return (
    <div>
      <div className="Rating">
        <h1 className="title">Home Service</h1>
        <h2>Registre aqui sua avaliação!</h2>
      </div>

      <section className="rating--section">
        <div className="Rating--bar">
          <Rating
            value={value}
            cancel={false}
            onChange={(e) => setValue(e.value)}
            stars={5}
          />
        </div>
        <form>
          <div className="box-register">
            <textarea
              placeholder="Digite seu comentário"
              required="Text"
              rows="5"
              cols="20"
              wrap="hard"
              className="TextArea"
            />
          </div>
        </form>
      </section>
    </div>
  );
}
