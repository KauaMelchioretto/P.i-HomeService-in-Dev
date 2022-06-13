import React, { useEffect, useState } from "react";
import "./ServiceScreen.css";
import { NavLink } from "react-router-dom";
import { Rating } from "primereact/rating";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import useQueryParam from "../../hooks/useQueryParam";
import CardService from "../cards/CardService";
import MenuBar from "../menubar/MenuBar";
import CardAvaliation from "../cards/CardAvaliation";
import { registerAvaliation } from "../../services/registers/Registers";
import { useSelector } from "react-redux";
import axios from "axios";
import { useAuth } from "../../hooks/auth";

export default function ServiceScreen() {
  const [value, setValue] = useState(0);
  const [stars, setStars] = useState(5);
  const [avaliations, setAvaliations] = useState({});
  const [details] = useQueryParam("detailsProfessional");
  const [listAvaliations, setListAvaliations] = useState();
  const auth = useAuth();
  var cookieToken;
  var token = useSelector(({rootReducer: {login : {token}}}) => token);

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

  useEffect(async () => {
    cookieToken = await axios.get("http://localhost:3001/getcookie");
    const data = JSON.stringify(cookieToken.data.token);
    if(cookieToken.data.token != undefined) {
    token = data.replace(/[{}"]/g, '');
   }}); 

  const handleClickAvaliation = async () => {
    if(token != undefined && auth.user != null) {
      if(validation(value)){
      const userToken = token;
      const idService = details.id;
      const comment = avaliations.comment;
      const avaliation = value;
      userToken != undefined ?  await registerAvaliation(idService, userToken, comment, avaliation) : window.alert("Faça login para registrar uma avaliação!");
      clearAvaliations();
      }
    } else window.alert("Faça login para registrar uma avaliação!");
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
            <button className="avaliate--button" type="button" onClick={() => handleClickAvaliation()}>
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
