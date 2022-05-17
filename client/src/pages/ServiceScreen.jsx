import React, { useState } from "react";
import "./ServiceScreen.css";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import { Rating } from "primereact/rating";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import useQueryParam from "../hooks/useQueryParam";
import CardService from "../components/CardService";
import MenuBar from "../components/MenuBar";
import * as JSURL from "jsurl";

export default function ServiceScreen() {
  const [value, setValue] = useState(0);
  const [avaliations, setAvaliations] = useState({});
  const [details] = useQueryParam("detailsProfessional");

  const handleChangeAvaliations = (value) => {
    setAvaliations((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const validation = () => {
    var message = "";
    if (value == 0) message = "Informe alguma estrela de nível de avaliação!\n";
    if (message != "") {
      window.alert(message);
      return false;
    }
    return true;
  };
  
  const RegisterAvaliation = () => {
    if (validation(value)) {
      Axios.post("http://localhost:3001/registrar_avaliacao", {
        idService: details.id,
        comment: avaliations.comment,
        avaliation: value,
      }).then((response) => {
        if(response) {
          setAvaliations({
            comment: "",
          });
          setValue({
            value: 0,
          });
        }
      });
    }
  };

  return (
    <div>
      <MenuBar></MenuBar>
      <header className="header--container">
        <h1 className="title">Home Service</h1>
        <h1>Detalhes do serviço</h1>
      </header>

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
                name="comment"
                rows="5"
                cols="20"
                wrap="hard"
                className="TextArea"
                onChange={handleChangeAvaliations}
              />
            </div>
            <button onClick={() => RegisterAvaliation()}>Cadastrar Avaliação</button>
          </form>
        </section>
      </div>
    </div>
  );
}
