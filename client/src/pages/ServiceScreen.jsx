import React, { useState } from "react";
import "./ServiceScreen.css";
import { NavLink, renderMatches } from "react-router-dom";
import { Rating } from "primereact/rating";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import useQueryParam from "../hooks/useQueryParam";
import CardService from "../components/CardService";

export default function ServiceScreen() {
  const [value, setValue] = useState(0);
  const [professional, setProfessional] = useQueryParam("professional");

  return (
    <div>
      <header className="header--container">
        <h1 className="title">Home Service</h1>
        <h1>Resultados</h1>
      </header>

      {
        <CardService
          key={professional.id}
          id={professional.id}
          name={professional.name}
          profession={professional.profession}
          city={professional.city}
          city2={professional.city2}
          numberTel={professional.numberTel}
          description={professional.description}
        ></CardService>
      }

      <div>
        <NavLink to="/avaliacao"> Avaliação </NavLink>
      </div>

      <div className="Avaliations">
        <div>
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
            <div>
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
    </div>
  );
}
