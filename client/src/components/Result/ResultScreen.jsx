import { React } from "react";
import "./ResultScreen.css";
import CardResult from "../cards/CardResult";
import useQueryParam from "../../hooks/useQueryParam";
import MenuBar from "../menubar/MenuBar";

export default function ResultScreen() {

  const [professional] = useQueryParam("professional");

  return (
    <div>
      <MenuBar></MenuBar>
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
              key={value.idservice}
              id={value.idservice}
              name={value.name}
              profession={value.profession}
              city={value.city}
              city2={value.city}
              numberTel={value.numberTel}
              description={value.description}
            ></CardResult>
          ))}
      </div>
    </div>
  );
}
