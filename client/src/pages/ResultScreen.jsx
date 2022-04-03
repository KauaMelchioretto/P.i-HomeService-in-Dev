import React from 'react';
import './ResultScreen.css';
import Image from '../img/eu.jpg'

export default ResultScreen =>
{
    return(
        <div>
            
            <header className='header--container'>
                 <h1 className='title'>Home Service</h1>
            </header>

            <div className='subtitle'>
                <h1>Resultados</h1>
            </div>

            <div className='result--information'>

                <img className='img--user' src={Image}/>

                <div className='informations'>      
                    <p>Profissão: Profissão</p>
                    <p>Nome: Nome do profissional.</p>
                    <p>Descrição: Descrição do serviço.</p>
                    <p>Endereço de atuação: Endereço onde o serviço está sendo prestado.</p>
                </div>
            </div>
        </div>
           
    );
}
