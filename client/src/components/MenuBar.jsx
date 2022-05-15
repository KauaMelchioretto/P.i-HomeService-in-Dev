import React from "react";
import "./MenuBar.css";
import { NavLink
 } from "react-router-dom";
export default function MenuBar () {
    return(
        <nav id="menu--nav">
            <ul>
                <li><NavLink to="/inicio" id="menu--items">Home</NavLink></li>
                <li><NavLink to="/registros" id="menu--items">Cadastre seu serviço</NavLink></li>
            </ul>
        </nav>
    );
}