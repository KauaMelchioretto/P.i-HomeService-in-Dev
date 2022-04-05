import React from 'react';
import Search from '../img/search_icon.svg';
import List from '../img/list_icon.svg';
import { NavLink } from 'react-router-dom';
import './InitScreen.css';

export default InitScreen =>
 {
    return (

        <div>

            <header className="MainScreen--container">
                <h1 className='title'>Home Service</h1>
                <input data-ls-module='charCounter' class='search--input' type='text' placeholder='Pesquise aqui!'
                    maxlength='100'></input>
                <NavLink to='/resultados'><img src={Search} className='search--icon' alt='Search' /></NavLink>
                <img src={List} className='list--icon' alt='Search' />

            </header>

            <div>
                <NavLink id='register--button' to='/registros'>Cadastre seu serviço</NavLink>
            </div>



            <section className='fast--search'>

                <NavLink id='button--search' to='/resultados'>Encanador</NavLink>
                <NavLink id='button--search' to='/resultados'>Eletricista</NavLink>
                <NavLink id='button--search' to='/resultados'>Marceneiro</NavLink>

            </section>
        </div>
    );
}
