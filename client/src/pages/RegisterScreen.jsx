import React, { useState, useEffect, setState, useCallback } from "react";
import "./RegisterScreen.css";
import Axios from "axios";
import Card from "../components/Card";

export default function RegisterScreen() {

    const [values, setValues] = useState({
        name: '',
        profession: '',
        profession: '',
        city: '',
        city2: '',
        numberTel: '',
        description: '',
    });
    const [listServices, setListServices] = useState();


    const ChangeValues = (value) => {
        setValues(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    }

    const RegisterService = () => {
        Axios.post("http://localhost:3001/registros", {
            name: values.name,
            profession: values.profession,
            city: values.city,
            city2: values.city2,
            numberTel: values.numberTel,
            description: values.description,
        }).then(() => {
    
            }); 
        };
    

    const clear = () => {
        setValues({
            name: '',
            profession: '',
            profession: '',
            city: '',
            city2: '',
            numberTel: '',
            description: '',
         }); console.log(values);
         console.log(values); } 


    useEffect(() => {
        Axios.get("http://localhost:3001/getCards").then((response) => {
            setListServices(response.data);
        });
    }, [listServices]);


    return (
        <div>
            <div className="Registro">
                <h1 className='title'>Home Service</h1>
            </div>
            <section className="register--section">
                <form>
                    <div className='box-register'>
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
                    <div className='box-register'>
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
                    <div className='box-register'>
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
                    <div className='box-register'>
                        <label>Cidade de atuação (opcional)</label>
                        <input
                            id="city2"
                            name="city2"
                            placeholder="Secundaria (opcional)"
                            required="Text"
                            onChange={ChangeValues}
                            values={values.city2}
                        />
                    </div>
                    <div className='box-register'>
                        <label>Número de telefone</label>
                        <input
                            id="numberTel"
                            name="numberTel"
                            placeholder="Digite o número de telefone"
                            required="Text"
                            onChange={ChangeValues}
                            values={values.numberTel}
                        />
                    </div>
                    <div className='box-register'>
                        <label>Descrição</label>
                        <textarea
                            rows="8"
                            name="description"
                            required="text"
                            onChange={ChangeValues}
                            values={values.description}
                        />
                    </div>
                </form>

                <div className="buttons-salvar">
                    <button type="submit" onClick={() => clear()}>Cadastrar</button>
                </div>
                <div className="buttons-descartar">
                    <button type="reset">Descartar</button>
                </div>
            </section>

            <div className="Card">
                {typeof listServices !== "undefined" && listServices.map((value) => {
                    return <Card key={value.id} listCard={listServices} setListServices={setListServices}
                        id={value.id}
                        name={value.name}
                        profession={value.profession}
                        city={value.city}
                        city2={value.city2}
                        numberTel={value.numberTel}
                        description={value.description}>
                    </Card>;
                })}
            </div>

        </div>

    );

} 
