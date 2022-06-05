import React, { useEffect, useState } from "react";
import "./ServiceScreen.css";
import { NavLink } from "react-router-dom";
import { Rating } from "primereact/rating";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import useQueryParam from "../../hooks/useQueryParam";
import CardService from "../../components/Cards/CardService";
import MenuBar from "../../components/MenuBar/MenuBar";
import CardAvaliation from "../../components/Cards/CardAvaliation";
import { getUserName, registerAvaliation } from "../../services/Registers/Registers";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ServiceScreen() {
  const [value, setValue] = useState(0);
  const [stars, setStars] = useState(5);
  const [avaliations, setAvaliations] = useState({});
  const [details] = useQueryParam("detailsProfessional");
  const [listAvaliations, setListAvaliations] = useState();
  const token = useSelector(({rootReducer: {login : {token}}}) => token);

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
    const userToken = token;
    const idService = details.id;
    const comment = avaliations.comment;
    const avaliation = value;
    const username = await getUserName(userToken);
    username != undefined ? await registerAvaliation(idService, username, comment, avaliation) : window.alert("Faça login para registrar uma avaliação!");
    clearAvaliations();
    }
  }

  const clearAvaliations = () => {
    //falta arrumar
    setAvaliations({
      comment: ""
    }); setValue({
      value: 0,
    }); setStars ({
      stars: 5,
    });
  }

  useEffect(() => {
    axios.post("http://localhost:3001/getAvaliations", {
      idService: details.id,
    }).then((response) => {
      setListAvaliations(response.data);
    });
  }, [listAvaliations]);

  return (
    <div className="main--container">
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
              stars={stars}
            />
          </div>

          <div>
            <div>
              <textarea
                placeholder="Digite seu comentário"
                name="comment"
                rows="5"
                cols="20"
                wrap="hard"
                className="input--field--avaliation"
                onChange={changeAvaliations}
                value={avaliations.comment}
              />
            </div>
            <button type="button" onClick={() => handleClickAvaliation()}>
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
