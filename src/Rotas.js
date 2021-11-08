import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detalhes from "./pages/Detalhes";
import Inicial from "./pages/Inicial";
import NovoCliente from "./pages/NovoCliente";
import EditarCliente from "./pages/EditarCliente";

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicial />} />
                <Route path="/detalhes/:clienteid" element={<Detalhes />} />
                <Route path="/novocliente/:clienteid" element={<NovoCliente />} />
                <Route path="/editarcliente/:clienteid" element={<EditarCliente />} />
            </Routes>
        </BrowserRouter>
    );
}