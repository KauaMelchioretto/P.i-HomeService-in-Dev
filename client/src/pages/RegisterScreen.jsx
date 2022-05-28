import React, { useState, useEffect} from "react";
import "./RegisterScreen.css";
import Axios from "axios";
import CardRegister from "../components/CardRegister";
import MenuBar from "../components/MenuBar";
import useQueryParam from "../hooks/useQueryParam";


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
  const [userInformations] = useQueryParam("usuario");

  const changeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const registerService = () => {
    if (validation(values)) {
      Axios.post("http://localhost:3001/registros", {
        iduser: parseInt(userInformations.map((value) => value.iduser)),
        name: values.name,
        profession: values.profession,
        city: values.city,
        city2: values.city2,
        numberTel: values.numberTel,
        description: values.description,
      }).then((response) => {
        if (response) {
          clearInputs();
        }
      });
    }
  };

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
    Axios.post("http://localhost:3001/getCards", {
      iduser: parseInt(userInformations.map((value) => value.iduser)),
    }).then((response) => {
      setListServices(response.data);
    });
  }, [listServices]);

  return (
    <div>
      <MenuBar/>
      <header className="header--container">
        <h1 className="title">Home Service</h1>
        <h2>Cadastre seus serviços aqui!</h2>
      </header>
      <section className="custom--section">
        <form>
          <div className="box-register">
            <label>Nome</label>
            <input
              id="name"
              name="name"
              placeholder="Digite seu nome"
              required="Text"
              onChange={changeValues}
              value={values.name}
              className="input--field"
            />
          </div>
          <div className="box-register">
            <label>Profissão</label>
            <input
              id="profession"
              name="profession"
              placeholder="Digite sua profissão"
              required="Text"
              onChange={changeValues}
              value={values.profession}
              className="input--field"
            />
          </div>
          <div className="box-register">
            <label>Cidade de atuação</label>
            <input
              id="city"
              name="city"
              placeholder="Principal"
              required="Text"
              onChange={changeValues}
              value={values.city}
              className="input--field"
            />
          </div>
          <div className="box-register">
            <label>Cidade de atuação (opcional)</label>
            <input
              id="city2"
              name="city2"
              placeholder="Secundaria (opcional)"
              required="Text"
              onChange={changeValues}
              value={values.city2}
              className="input--field"
            />
          </div>
          <div className="box-register">
            <label>Número de telefone</label>
            <input
              id="numberTel"
              name="numberTel"
              placeholder="Digite o número de telefone"
              required="Text"
              onChange={changeValues}
              value={values.numberTel}
              className="input--field"
            />
          </div>
          <div className="box-register">
            <label>Descrição</label>
            <textarea
              rows="8"
              name="description"
              required="text"
              onChange={changeValues}
              value={values.description}
              className="input--field"
            />
          </div>
            
        <div className="buttons">
            <button
              type="button"
              className="action--buttons"
              onClick={() => registerService()}
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

      <div className="services--title">
          <h1>Seus serviços cadastrados</h1>
      </div>

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
}
