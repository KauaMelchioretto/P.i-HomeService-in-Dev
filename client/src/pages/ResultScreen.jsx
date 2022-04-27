import { React } from "react";
import "./ResultScreen.css";
import UserImage from "../img/eu.jpg";
import { NavLink } from "react-router-dom";
import WppIcon from "../img/WppIcon.webp";
import CardResult from "../components/CardResult";
import useQueryParam from "../hooks/useQueryParam";

export default function ResultScreen(props) {
  const [professional, setProfessional] = useQueryParam("professional");

  return (
    <div>
      <header className="header--container">
        <h1 className="title">Home Service</h1>
      </header>

      <div className="subtitle">
        <h1>Resultados</h1>
      </div>

      <div className="result--information">
        {Array.isArray(professional) &&
          professional.map((value) => (
            <CardResult
              key={value.id}
              id={value.id}
              name={value.name}
              profession={value.profession}
              city={value.city}
            ></CardResult>
          ))}
      </div>
    </div>
  );
}
