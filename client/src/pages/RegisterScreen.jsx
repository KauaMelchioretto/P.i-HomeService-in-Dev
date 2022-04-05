import React from "react";
import "./RegisterScreen.css";

export default function RegisterScreen() {
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
                    <input id="title" name="title" placeholder="Digite seu nome" required="Text" />
                </div>
                <div className='box-register'>
                    <label>Profissão</label>
                    <input id="prof" name="prof" placeholder="Digite sua profissão" required="Text" />
                </div>
                <div className='box-register'>
                    <label>Cidade de atuação</label>
                    <input id="cidade" name="cidade" placeholder="Digite a cidade de atuação" required="Text" />
                </div>
                <div className='box-register'>
                    <label>Número de telefone</label>
                    <input id="numero" name="numero" placeholder="Digite o número de telefone" required="Text" />
                </div>
                <div className='box-register'>
                    <label>Descrição</label>
                    <textarea rows="10" name="desc"  required="text" />
                </div>
            </form>
                
                <div className="div-buttons-salvar">
                    <button type="submit">Salvar</button>
                </div> 
                <div className="div-buttons-descartar">    
                    <button type="submit">Descartar</button>
                </div>
            
            </section>
            </div>

            ); 
            
        } 