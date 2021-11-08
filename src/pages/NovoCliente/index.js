import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { cpf, cnpj } from 'cpf-cnpj-validator'; 
import './styles.css';

export default function NovoCliente() {

    //acessa a API
    const baseUrl = "https://localhost:44370/api/clientes";

    const { clienteid } = useParams();

    const [data, setData] = useState([]);

    const [clienteSelecionado, setClienteSelecionado] = useState(
        {
            clienteId: '',
            nome: '',
            tipoPessoa: '',
            nroDocumento: '',
            dataNasc: '',
            status: ''
        })

    //guarda os dados informados nos inputs
    const handleChange = e => {
        const { name, value } = e.target;
        setClienteSelecionado({
            ...clienteSelecionado,
            [name]: value
        });
    }

    const pedidoPost = async () => {
        delete clienteSelecionado.clienteId;
        clienteSelecionado.tipoPessoa = parseInt(clienteSelecionado.tipoPessoa);

        //Validar documentos
        if (clienteSelecionado.tipoPessoa === 0){
            if (cpf.isValid(clienteSelecionado.nroDocumento) === false){
                clienteSelecionado.nroDocumento = '';
            }
        } else if (clienteSelecionado.tipoPessoa === 1){
            if (cnpj.isValid(clienteSelecionado.nroDocumento) === false){
                clienteSelecionado.nroDocumento = '';
            }
            clienteSelecionado.dataNasc = '1900-01-01';
        } 
        
        // if(clienteSelecionado.tipoPessoa === 1) {clienteSelecionado.dataNasc = '1900-01-01'};
        clienteSelecionado.status = parseInt(clienteSelecionado.status);

        await axios.post(baseUrl, clienteSelecionado)
            .then(response => {
                setData(data.concat(response.data));
            }).catch(error => {
                console.log(error);
            })
    };

    return (
        <div className="container">
            <h3 className="center-align">{clienteid === '0' ? 'Cadastro de Cliente' : 'Atualizar Cliente'}</h3>
            <div className="row">
                <div className="col s12">
                    <div className="card z-depth-0 grey lighten-3">
                        <div className="card-content">
                            <label>Nome</label>
                            <input type="text" name="nome" required onChange={handleChange} />
                            <div className="row">
                                <div className="col s6">
                                    <label>Tipo de Pessoa</label>
                                    <br></br>
                                    <br></br>
                                    <div name="tipoPessoa" required onChange={handleChange}>
                                        <label>
                                            <input type="radio" name="tipoPessoa" value="0" />
                                            <span>Física</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="tipoPessoa" value="1" />
                                            <span>Jurídica</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="col s6">
                                    <label>{clienteSelecionado.tipoPessoa === '0' ? 'CPF' : 'CNPJ'}</label>
                                    <input type="text" name="nroDocumento" required onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                {clienteSelecionado.tipoPessoa === '0' ?
                                    <div className="col s6">
                                        <label>Data Nasc.</label>
                                        <input type="date" name="dataNasc" onChange={handleChange} />
                                    </div> : 
                                    <></>
                                }
                                <div className="col s6">
                                    <label>Status</label>
                                    <select className="browser-default" name="status" required onChange={handleChange}>
                                        <option value="" disabled selected>Selecione um status</option>
                                        <option value="1">Ativo</option>
                                        <option value="0">Inativo</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="input-field center-align col m6 s12">
                    <Link className="btn waves-effect waves-light grey darken-2" to="/novoendereco" onClick={pedidoPost}>Salvar</Link>
                </div>
                <div className="input-field center-align col m6 s12">
                    <Link className="btn waves-effect waves-light grey darken-2" to="/">Voltar</Link>
                </div>
            </div>
        </div>
    );
}