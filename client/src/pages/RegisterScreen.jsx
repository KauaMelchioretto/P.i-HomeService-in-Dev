import React, { useState, useEffect, setState, useCallback } from "react";
import "./RegisterScreen.css";
import Axios from "axios";
import CardRegister from "../components/CardRegister";

export default function RegisterScreen() {
  const [values, setValues] = useState({
    name: "",
    profession: "",
    profession: "",
    city: "",
    city2: "",
    numberTel: "",
    description: "",
  });
  const [listServices, setListServices] = useState();

  const ChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const RegisterService = () => {
    if (validation(values)) {
      Axios.post("http://localhost:3001/registros", {
        name: values.name,
        profession: values.profession,
        city: values.city,
        city2: values.city2,
        numberTel: values.numberTel,
        description: values.description,
      }).then((response) => {
        if (response) {
          setValues({
            name: "",
            profession: "",
            profession: "",
            city: "",
            city2: "",
            numberTel: "",
            description: "",
          });
        }
      });
    }
}

    const validation = () => {
      var message = "";
      if (values.name == "") {
        message += "Informe um nome!\n";
      }
      if (values.profession == "") {
        message += "Informe uma profissão!\n";
      }
      if (values.city == "") {
        message += "Informe uma cidade!\n";
      }
      if (values.numberTel == "") {
        message += "Informe um número de telefone!\n";
      }
      if (message != "") {
        window.alert(message);
        return false;
      }
      return true;
    };

    const clearInputs = () => {
      setValues({
        name: "",
        profession: "",
        profession: "",
        city: "",
        city2: "",
        numberTel: "",
        description: "",
      });
    };

    useEffect(() => {
      Axios.get("http://localhost:3001/getCards").then((response) => {
        setListServices(response.data);
      });
    }, [listServices]);

    return (
      <div>
        <div className="Registro">
          <h1 className="title">Home Service</h1>
          <NavLink to='/inicio'>click here</NavLink>
        </div>
        <section className="register--section">
          <form>
            <div className="box-register">
              <label>Nome</label>
              <input
                id="name"
                name="name"
                placeholder="Digite seu nome"
                required="Text"
                onChange={ChangeValues}
                value={values.name}
              />
            </div>
            <div className="box-register">
              <label>Profissão</label>
              <input
                id="profession"
                name="profession"
                placeholder="Digite sua profissão"
                required="Text"
                onChange={ChangeValues}
                value={values.profession}
              />
            </div>
            <div className="box-register">
              <label>Cidade de atuação</label>
              <input
                id="city"
                name="city"
                placeholder="Principal"
                required="Text"
                onChange={ChangeValues}
                value={values.city}
              />
            </div>
            <div className="box-register">
              <label>Cidade de atuação (opcional)</label>
              <input
                id="city2"
                name="city2"
                placeholder="Secundaria (opcional)"
                required="Text"
                onChange={ChangeValues}
                value={values.city2}
              />
            </div>
            <div className="box-register">
              <label>Número de telefone</label>
              <input
                id="numberTel"
                name="numberTel"
                placeholder="Digite o número de telefone"
                required="Text"
                onChange={ChangeValues}
                value={values.numberTel}
              />
            </div>
            <div className="box-register">
              <label>Descrição</label>
              <textarea
                rows="8"
                name="description"
                required="text"
                onChange={ChangeValues}
                value={values.description}
              />
            </div>

            <div className="buttons">
              <button
                className="action--buttons"
                onClick={() => RegisterService()}
              >
                Cadastrar
              </button>
              <button
                className="action--buttons"
                type="reset"
                onClick={() => clearInputs()}
              >
                Descartar
              </button>
            </div>
          </form>
        </section>
        <div className="Card">
          {typeof listServices !== "undefined" &&
            listServices.map((values) => {
              return (
                <CardRegister
                  key={values.id}
                  listCard={listServices}
                  setListServices={setListServices}
                  id={values.id}
                  name={values.name}
                  profession={values.profession}
                  city={values.city}
                  city2={values.city2}
                  numberTel={values.numberTel}
                  description={values.description}
                ></CardRegister>
              );
            })}
        </div>
      </div>
    );
  };