import React from "react";
import {NavLink} from "react-router-dom";
import MenuBar from "../components/MenuBar";
import "./About.css";
import logoIfsc from "../img/logo-ifsc.svg";

export default function About(){
    return(
        <div >
            <MenuBar/>
            <div className="informacoes--sobre">
                <div className="imagem">
                    <img src={logoIfsc} alt="" />
                </div>
            </div>
        </div>
    ); 
}