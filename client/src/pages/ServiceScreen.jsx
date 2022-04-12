import React from "react";
import './ServiceScreen.css';
import UserImage from '../img/eu.jpg';
import WppIcon from '../img/WppIcon.webp'
import { NavLink } from 'react-router-dom';




export default ServiceScreen => {
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
        </div>
    );
}