import React, { useState } from "react";
import "./RegisterScreen.css";

export default function RegisterScreen() {

    const [values, setValues] = useState();
    const ChangeValues = (value) => 
    {
        setValues(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    }

    const RegisterService = () => 
    {
        console.log(values);
    }

    return (
        <div>
            <div className="Registro">
                <h1 className='title'>Home Service</h1>
                <h2>Registre aqui seu serviço!</h2>
            </div>

            <section className="register--section">
                <form>
                    <div className='box-register'>
                        <label>Nome</label>
                        <input
                            id="title"
                            name="title"
                            placeholder="Digite seu nome"
                            required="Text"
                            onChange={ChangeValues}
                        />
                    </div>
                    <div className='box-register'>
                        <label>Profissão</label>
                        <input
                            id="profissao"
                            name="profissao"
                            placeholder="Digite sua profissão"
                            required="Text"
                            onChange={ChangeValues}
                        />
                    </div>
                    <div className='box-register'>
                        <label>Cidade de atuação</label>
                        <input
                            id="cidade"
                            name="cidade"
                            placeholder="Digite a cidade de atuação"
                            required="Text"
                            onChange={ChangeValues}
                        />
                    </div>
                    <div className='box-register'>
                        <label>Número de telefone</label>
                        <input
                            id="numero"
                            name="numero"
                            placeholder="Digite o número de telefone"
                            required="Text"
                            onChange={ChangeValues}
                        />
                    </div>
                    <div className='box-register'>
                        <label>Descrição</label>
                        <textarea rows="10" name="desc" required="text" />
                    </div>
                </form>
                <div className="div-buttons-salvar">
                    <button type="submit" onClick={() => RegisterService()}>Cadastrar</button>
                </div>
                <div className="div-buttons-descartar">
                    <button type="submit">Descartar</button>
                </div>
            </section>
        </div>

    );

} 