import React from 'react';
import Search from '../img/search_icon.svg';
import List from '../img/list_icon.svg';
import { NavLink , BrowserRouter as Router, Routes} from 'react-router-dom';
import classes from './InitScreen.css';

export default function InitScreen()
{
    return (

        <header className={classes.header}>

            <div className="MainScreen--container">
                <h1 className='title'>Home Service</h1>
                <input data-ls-module='charCounter' class='search--input' type='text' placeholder='Pesquise aqui!'
                maxlength='100'></input>
                <span><img src={Search} className='search--icon' alt='Search'/></span>
                <span><img src={List} className='list--icon' alt='Search'/></span>
            </div>

            <NavLink id='register--button' className={(navData) => (navData.isActive ? classes.active : 'button--search')} to='/resultados'>Cadastre seu serviço</NavLink>

            <div className='fast--search'>
                
                <NavLink id='button--search' className={(navData) => (navData.isActive ? classes.active : 'button--search')} to='/resultados'>Encanador</NavLink>
                <NavLink id='button--search' className={(navData) => (navData.isActive ? classes.active : 'button--search')} to='/resultados'>Eletricista</NavLink>
                <NavLink id='button--search' className={(navData) => (navData.isActive ? classes.active : 'button--search')} to='/resultados'>Marceneiro</NavLink>
        
          </div>
          </header>
    );
}

