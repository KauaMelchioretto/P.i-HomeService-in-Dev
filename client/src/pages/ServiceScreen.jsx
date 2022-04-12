import React, { useState } from "react";
import './ServiceScreen.css';
import UserImage from '../img/eu.jpg';
import WppIcon from '../img/WppIcon.webp'
import { NavLink } from 'react-router-dom';
import { Rating } from "primereact/rating";
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons




export default ServiceScreen => {
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);

    return (

        <div>
            <header className='header--container'>
                <h1 className='title'>Home Service</h1>
                <h1>Resultados</h1>
            </header>



            <div className="service--container">
                <div className="service--informations">
                    <img className="img--user" src={UserImage} alt="" />
                    <p>Nome:</p>
                    <p>Profissão:</p>
                    <p>Cidade de atuação:</p>
                    <p>Descrição:</p>
                    <NavLink className='Wpp--btn' to='' > <img src={WppIcon} alt="" width='25px' /> </NavLink>
                </div>
            </div>

            <div>
                <NavLink to='/avaliacao' > Avaliação </NavLink>
            </div>

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
                            stars={5}
                        />
                    </div>

                    <form>
                        <div>
                            <textarea
                                placeholder="Digite seu comentário"
                                required="Text"
                                rows="5"
                                cols="20"
                                wrap="hard"
                                className="TextArea"
                            />
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}