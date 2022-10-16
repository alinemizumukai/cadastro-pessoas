import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detalhes from "./pages/Detalhes";
import Inicial from "./pages/Inicial";
import Clientes from "./pages/Clientes";

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicial />} />
                <Route path="/detalhes/:clienteid" element={<Detalhes />} />
                <Route path="/novocliente/:clienteid" element={<Clientes />} />
            </Routes>
        </BrowserRouter>
    );
}