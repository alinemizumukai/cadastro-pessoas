import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

export default function Detalhes() {

    const { clienteid } = useParams();

    //acessa a API
    const baseUrl = `https://localhost:44370/api/clientes/${clienteid}`;

    const [data, setData] = useState([]);
    const [updateData, setUpdateData] = useState(true);

    const pedidoGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (updateData) {
            pedidoGet();
            setUpdateData(false);
        }
    }, [updateData])


    return (
        <div className="container">
            <h3 className="center-align">Cliente {data.nome}</h3>
            <div className="row">
                <div className="col s12">
                    <div className="card z-depth-0 grey lighten-3">
                        <div className="row">
                            <div className="col s10">
                                <div className="card-content">
                                    <input type="hidden" name="id" value={data.clienteId} />
                                    <label>Nome</label>
                                    <input type="text" name="nome" value={data.nome} />
                                    <div className="row">
                                        <div className="col s6">
                                            <label>Tipo de Pessoa</label>
                                            <br></br>
                                            <br></br>
                                            <label>
                                                {data.tipoPessoa === 0 ? <input type="radio" name="tipoPessoa" checked /> : <input type="radio" name="tipoPessoa" />}
                                                <span>Física</span>
                                            </label>
                                            <label>
                                                {data.tipoPessoa === 1 ? <input type="radio" name="tipoPessoa" checked /> : <input type="radio" name="tipoPessoa" />}
                                                <span>Jurídica</span>
                                            </label>
                                        </div>
                                        <div className="col s6">
                                            <label>{data.tipoPessoa === 0 ? 'CPF' : 'CNPJ'}</label>
                                            <input type="text" name="nroDoc" value={data.nroDocumento} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        {data.tipoPessoa === 0 ?
                                            <div className="col s6">
                                                <label>Data Nasc.</label>
                                                <input type="text" name="dataNasc" value={data.dataNasc} />
                                            </div>
                                            : <></>}
                                        <div className="col s6">
                                            <label>Status</label>
                                            <input type="text" name="status" value={data.status === 1 ? 'Ativo' : 'Inativo'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="center-align col s2">
                                <Link className="material-icons" to={`/novocliente/${data.clienteId}`}>edit</Link>
                                <br></br>
                                <Link className="material-icons" to="deletarcliente">delete</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col s12">
                    <div className="card z-depth-0 grey lighten-3">
                        <div className="row">
                            <div className="col s10">
                                <div className="card-content">
                                    <span className="card-title">Endereço (em desenvolvimento)</span>
                                    <input type="hidden" name="id" value="id" />
                                    <label>Logradouro</label>
                                    <input type="text" name="end" value="xxxxx" />
                                    <div className="row">
                                        <div className="col s3">
                                            <label>Número</label>
                                            <input type="text" name="nro" value="xxxxxxx" />
                                        </div>
                                        <div className="col s9">
                                            <label>Complemento</label>
                                            <input type="text" name="complem" value="xxxxxxx" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s6">
                                            <label>Bairro</label>
                                            <input type="text" name="bairro" value="xxxxxxx" />
                                        </div>
                                        <div className="col s6">
                                            <label>CEP</label>
                                            <input type="text" name="cep" value="xxxxxxx" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s6">
                                            <label>Cidade</label>
                                            <input type="text" name="cidade" value="xxxxxxx" />
                                        </div>
                                        <div className="col s6">
                                            <label>Estado</label>
                                            <input type="text" name="estado" value="xxxxxxx" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="center-align col s2">
                                <Link className="material-icons" to="editarendereco">edit</Link>
                                <br></br>
                                <Link className="material-icons" to="deletarendereco">delete_forever</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="input-field center-align col m6 s12">
                    <Link className="btn waves-effect waves-light grey darken-2" to="novoendereco">Novo Endereço</Link>
                </div>
                <div className="input-field center-align col m6 s12">
                    <Link className="btn waves-effect waves-light grey darken-2" to="/">Voltar</Link>
                </div>
            </div>
        </div>
    );
}