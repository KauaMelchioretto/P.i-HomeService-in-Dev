import { React } from "react";
import "./ResultScreen.css";
import CardResult from "../components/CardResult";
import useQueryParam from "../hooks/useQueryParam";
import MenuBar from "../components/MenuBar";
import CardService from "../components/CardService";

export default function ResultScreen() {
  const [professional] = useQueryParam("professional");
  console.log(professional);
  console.log(typeof professional);
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
              key={value.id}
              id={value.id}
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
