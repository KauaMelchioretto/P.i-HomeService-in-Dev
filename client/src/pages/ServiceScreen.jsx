import React, { useState } from "react";
import "./ServiceScreen.css";
import { useNavigate, NavLink } from "react-router-dom";
import { Rating } from "primereact/rating";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import useQueryParam from "../hooks/useQueryParam";
import CardService from "../components/CardService";
import MenuBar from "../components/MenuBar";
import * as JSURL from "jsurl";

export default function ServiceScreen(props) {
  const [value, setValue] = useState(0);
  const [details] = useQueryParam("detailsProfessional");

  return (
    <div>
      <MenuBar></MenuBar>
      <header className="header--container">
        <h1 className="title">Home Service</h1>
        <h1>Detalhes do serviço</h1>
      </header>
      <button className="custom--button" onClick={() => window.history.back()}> Voltar</button>

      {
        <CardService
          key={details.id}
          id={details.id}
          name={details.name}
          profession={details.profession}
          city={details.city}
          city2={details.city2}
          numberTel={details.numberTel}
          description={details.description}
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
