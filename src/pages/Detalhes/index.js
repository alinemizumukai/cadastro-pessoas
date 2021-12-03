import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

export default function Detalhes() {

    //Dados do cliente
    const [clienteId, setClienteId] = useState('');
    const [nome, setNome] = useState('');
    const [tipoPessoa, setTipoPessoa] = useState('');
    const [nroDocumento, setNroDocumento] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [status, setStatus] = useState('');

    const { clienteid } = useParams();
    const history = useNavigate();

    //função para carregar os dados do cliente (pelo id)
    async function loadCliente() {
        try {
            const response = await api.get(`api/clientes/${clienteid}`)

            setClienteId(response.data.clienteId);
            setNome(response.data.nome);
            setTipoPessoa(response.data.tipoPessoa);
            setNroDocumento(response.data.nroDocumento);
            setDataNasc(response.data.dataNasc);
            setStatus(response.data.status);

        } catch (error) {
            alert('Erro ao recuperar os dados do cliente' + error)
            history('/');
        }
    }

    //verificar se é inclusão ou edição
    useEffect(() => {
        if (clienteid === '0')
            return;
        else
            loadCliente();
    }, clienteid)

    //Função para deletar um cliente (torná-lo inativo)
    async function deletecliente(event){
        const data = {
            clienteId,
            nome,
            tipoPessoa,
            nroDocumento,
            dataNasc
        }

        try {
            if(window.confirm('Deseja excluir o cliente?'))
            {
                data.status = 0;
                await api.put(`api/clientes/${clienteid}`, data)
                history('/');
            }
            
        } catch (error) {
            alert('Não foi possível excluir o cliente.')
            history('/');
        }
    }

    return (
        <div className="container">
            <h3 className="center-align">Cliente {nome}</h3>
            <div className="row">
                <div className="col s12">
                    <div className="card z-depth-0 grey lighten-3">
                        <div className="row">
                            <div className="col s10">
                                <div className="card-content">
                                    <input type="hidden" name="id" value={clienteId} />
                                    <label>Nome</label>
                                    <input type="text" name="nome" value={nome} />
                                    <div className="row">
                                        <div className="col s6">
                                            <label>Tipo de Pessoa</label>
                                            <br></br>
                                            <br></br>
                                            <label>
                                                {tipoPessoa === 0 ? <input type="radio" name="tipoPessoa" checked /> : <input type="radio" name="tipoPessoa" />}
                                                <span>Física</span>
                                            </label>
                                            <label>
                                                {tipoPessoa === 1 ? <input type="radio" name="tipoPessoa" checked /> : <input type="radio" name="tipoPessoa" />}
                                                <span>Jurídica</span>
                                            </label>
                                        </div>
                                        <div className="col s6">
                                            <label>{tipoPessoa === 0 ? 'CPF' : 'CNPJ'}</label>
                                            <input type="text" name="nroDoc" value={nroDocumento} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        {tipoPessoa === 0 ?
                                            <div className="col s6">
                                                <label>Data Nasc.</label>
                                                <input type="text" name="dataNasc" value={new Date (dataNasc).toLocaleDateString()} />
                                            </div>
                                            : <></>}
                                        <div className="col s6">
                                            <label>Status</label>
                                            <input type="text" name="status" value={status === 1 ? 'Ativo' : 'Inativo'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="center-align col s2">
                                <Link className="material-icons" to={`/novocliente/${clienteId}`}>edit</Link>
                                <br></br>
                                <Link className="material-icons" to="deletarcliente" onClick={deletecliente}>delete</Link>
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