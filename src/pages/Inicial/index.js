import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Inicial() {

    //acessa a API
    const baseUrl = "https://localhost:44370/api/clientes";

    const [data, setData] = useState([]);

    const pedidoGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        pedidoGet();
    })

    return (
        <div className="container">
            <div className="row">
                <div className="center col m6 s12">
                    <h3>Bem-Vindo</h3>
                </div>
                <div className="input-field right-align col m6 s12">
                    <Link className="btn waves-effect waves-light grey darken-2" to="novocliente/0">Novo Cliente</Link>
                </div>
            </div>
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col m6 s12">
                            <i className="material-icons prefix">search</i>
                            <input id="search" type="text" className="validate" readOnly />
                            <label for="icon_prefix">Pesquisar</label>
                        </div>
                        <div className="input-field col m6 s12">
                            <select className="browser-default">
                                <option value="" disabled selected>Selecione um filtro</option>
                                <option value="1">Nome</option>
                                <option value="2">Nº Documento</option>
                                <option value="3">CEP</option>
                            </select>
                        </div>
                        <div className="center col s12" name="status">
                            <label>
                                <input name="status" type="radio" checked value={1} />
                                <span>Ativos</span>
                            </label>
                            <label>
                                <input name="status" type="radio" value={0} />
                                <span>Inativos</span>
                            </label>
                            <label>
                                <input name="status" type="radio" value={2} />
                                <span>Todos</span>
                            </label>
                        </div>
                    </div>
                </form>
                <div className="center">
                    <button className="btn waves-effect waves-light grey darken-2"
                        type="submit" name="action" readOnly>Filtrar</button>
                </div>
            </div>
            <h3 className="center">Relação de Clientes</h3>
            <div className="row">
                {data.map(cliente => (
                    <div className="col s12 l6">
                        <div key={cliente.clienteId} className="card z-depth-0 grey lighten-3">
                            <div className="card-content">
                                <span className="card-title"><b>{cliente.nome}</b></span>
                                <p>{cliente.tipoPessoa === 0 ? 'CPF' : 'CNPJ'}: {cliente.nroDocumento}</p>
                                <p>CEP: xxxx</p>
                                <p>Cidade: xxxx</p>
                                <p>Estado: xxxx</p>
                            </div>
                            <div className="card-action center">
                                <Link className="black-text" to={`detalhes/${cliente.clienteId}`} >Detalhes</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}