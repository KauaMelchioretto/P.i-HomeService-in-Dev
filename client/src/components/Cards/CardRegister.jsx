import React, { useState } from "react";
import FormDialog from "../dialog/dialog";
import "./CardRegister.css";

export default function Card(propsCard) {
  const [open, setOpen] = useState(false);

  const handleClickCard = () => {
    setOpen(true);
  };
  
  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        className="dialog"
        id={propsCard.id}
        name={propsCard.name}
        profession={propsCard.profession}
        city={propsCard.city}
        city2={propsCard.city2}
        numberTel={propsCard.numberTel}
        description={propsCard.description}
        listCard={propsCard.listCard}
        setListCard={propsCard.setListCard}
      />
      <div className="card--container" onClick={() => handleClickCard()}>
        <h1 className="card--name">Nome: {propsCard.name}</h1>
        <p className="card--profession">Profissão: {propsCard.profession}</p>
        <p className="card--city">Cidade: {propsCard.city}</p>
        <p className="card--city">Cidade(secundária): {propsCard.city2}</p>
        <p className="card--numberTel">
          Número de telefone: {propsCard.numberTel}
        </p>
        <p className="card--description">Descrição: {propsCard.description}</p>
      </div>
    </>
  );
}
