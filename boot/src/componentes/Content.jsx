
{/* 
    Routes Componente
    Estevan
    08/11/2023 (ultima alteração)
    Descrição Detalhada :
        Componente onde fica armazenado 
        todas as rotas de nosso produto
    Observações Pertinentes:
 */}


import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import SuporteLP from "../pages/pgsuporte/SuporteLP";
import Login from "../pages/pglogin/Login";
import Cadastro from '../pages/pgcadastro/Cadastro';
import Esqsenha from "../pages/pgesqsenha/Esqsenha";
import Appsite from '../argendereact/Appsite';
import Subcadastro from '../pages/Subcadastro'






const Content = props => (
    <main className="Content">
        <Routes>
            <Route path="/" exact element= {<Home />} />
            <Route path="*" element= {<NotFound />} />
            <Route path="/Suporte" element ={<SuporteLP />} />
            <Route path="/Login" element ={<Login />} />
            <Route path="/Cadastro" element={<Cadastro />} />
            <Route path="/Esqsenha" element ={<Esqsenha />} />
            <Route path="/Appsite" element ={<Appsite />} />
            <Route path="/Subcadastro" element={<Subcadastro/>} />

            
            

           
           
            
        </Routes>
    </main>
)

export default Content;