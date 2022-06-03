import React, { useEffect, useState } from "react";
import "./ServiceScreen.css";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import { Rating } from "primereact/rating";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import useQueryParam from "../../hooks/useQueryParam";
import CardService from "../../components/Cards/CardService";
import MenuBar from "../../components/MenuBar/MenuBar";
import CardAvaliation from "../../components/Cards/CardAvaliation";
import { registerAvaliation } from "../../services/Registers/Registers";

export default function ServiceScreen() {
  const [value, setValue] = useState(0);
  const [avaliations, setAvaliations] = useState({

  });
  const [details] = useQueryParam("detailsProfessional");
  const [listAvaliations, setListAvaliations] = useState();

  const changeAvaliations = (value) => {
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

  const handleClickAvaliation = async () => {
    if(validation(value)){
    const idService = details.id;
    const username = avaliations.username;
    const comment = avaliations.comment;
    const avaliation = value
    await registerAvaliation(idService, username, comment, avaliation);
      setAvaliations({
        comment: "",
        username: "",
      }); setValue({
        value: 1,
        stars: 5,
      });
    }
  }

  useEffect(() => {
    Axios.post("http://localhost:3001/getAvaliations", {
      idService: details.id,
    }).then((response) => {
      setListAvaliations(response.data);
    });
  }, [listAvaliations]);

  return (
    <div>
      <MenuBar/>
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

          <div>
            <div className="box-register">
              <label>Insira Seu Nome!</label>
              <input 
              type="text"
              name="username"
              required = "Text"
              onChange={changeAvaliations}
              value={avaliations.username}
               />
              <textarea
                placeholder="Digite seu comentário"
                name="comment"
                rows="5"
                cols="20"
                wrap="hard"
                className="TextArea"
                onChange={changeAvaliations}
                value={avaliations.comment}
              />
            </div>
            <button onClick={() => handleClickAvaliation()}>
              Registrar Avaliação
            </button>
          </div>
          <div className="card--avaliations">
          {typeof listAvaliations !== "undefined" &&
            listAvaliations.map((values) => {
              return (
                <CardAvaliation
                  key={values.idavaliation}
                  listCard={listAvaliations}
                  setListAvaliations={setListAvaliations}
                  idavaliation={values.idavaliation}
                  username={values.username}
                  comment={values.comment}
                  avaliation={values.avaliation}
                ></CardAvaliation>
              );
            })}
        </div>
        </section>
      </div>
    </div>
  );
}
