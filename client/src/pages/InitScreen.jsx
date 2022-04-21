import { React, useState } from 'react';
import Search from '../img/search_icon.svg';
import List from '../img/list_icon.svg';
import { NavLink } from 'react-router-dom';
import './InitScreen.css';
import Axios from "axios";

export default function InitScreen() {
    const [values, setValues] = useState();

    const handleChangeValues = (value) => {
        setValues(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    };

    const SearchServices = () => {
        Axios.post("http://localhost:3001/resultados", {
            information: values.information,
        });
    };

    {
        return (

            <div>

                <header className="MainScreen--container">
                    <h1 className='title'>Home Service</h1>
                    <input
                        data-ls-module='charCounter'
                        id='information'
                        name='information'
                        className='search--input'
                        type='text'
                        placeholder='Pesquise aqui!'
                        maxLength={100}
                        onChange={handleChangeValues}
                    ></input>

                    {/* <button className='search--icon' onClick={() => SearchServices()}> pesquisar </button> */}

                    <NavLink to='/resultados'
                    onClick={() => SearchServices()}><img src={Search} className='search--icon' alt='Search' /></NavLink>

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
}