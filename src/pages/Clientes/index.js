import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import './styles.css';
import api from '../../services/api';

export default function Clientes() {

    //Dados do cliente
    const [clienteId, setClienteId] = useState(null);
    const [nome, setNome] = useState('');
    const [tipoPessoa, setTipoPessoa] = useState('0');
    const [nroDocumento, setNroDocumento] = useState('');
    const [dataNasc, setDataNasc] = useState(new Date());
    const [status, setStatus] = useState(1);

    const { clienteid } = useParams();
    const history = useNavigate();  //usado para navegar entre as telas

    //verificar se é inclusão ou edição
    useEffect(() => {
        if (clienteid === '0')
            return;
        else
            loadCliente();
    }, clienteid)


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
            history('/')
        }
    }

    //incluir ou editar
    async function saveOrUpdate(event) {
        event.preventDefault();

        const data = {
            nome,
            tipoPessoa,
            nroDocumento,
            dataNasc,
            status
        }
        try {

            //Validar documentos
            if (tipoPessoa === '0' || tipoPessoa === 0) {
                if (cpf.isValid(nroDocumento) === false) {
                    nroDocumento = '';
                }
            } else if (tipoPessoa === '1' || tipoPessoa === 1) {
                if (cnpj.isValid(nroDocumento) === false) {
                    nroDocumento = '';
                }
            }

            if (clienteid === '0')
            {
                    await api.post('api/clientes', data)
                    history('/novoendereco');
            }
            else 
            {
                data.clienteId = clienteId;
                await api.put(`api/clientes/${clienteid}`, data)
                history('/');
            }
        } catch (error) {
            alert('Erro ao salvar: ' + error)
        }
        //history('/novoendereco');
    }

    return (
        <div className="container">
            <h3 className="center-align">{clienteid === '0' ? 'Cadastro de Cliente' : 'Atualizar Cliente'}</h3>
            <div className="row">
                <div className="col s12">
                    <div className="card z-depth-0 grey lighten-3">
                        <div className="card-content">
                            <label>Nome</label>
                            <input type="text" name="nome" required
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                            />
                            <div className="row">
                                <div className="col s6">
                                    <label>Tipo de Pessoa</label>
                                    <br></br>
                                    <br></br>
                                    <div name="tipoPessoa" required
                                        onChange={e => setTipoPessoa(e.target.value)}
                                    >
                                        <label>
                                            {tipoPessoa === '0' || tipoPessoa === 0 ? <input type="radio" name="tipoPessoa" value='0' checked /> : <input type="radio" name="tipoPessoa" value='0' />}
                                            <span>Física</span>
                                        </label>
                                        <label>
                                            {tipoPessoa === '1' || tipoPessoa === 1 ? <input type="radio" name="tipoPessoa" value='1' checked /> : <input type="radio" name="tipoPessoa" value='1' />}
                                            <span>Jurídica</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="col s6">
                                    <label>{tipoPessoa === '0' || tipoPessoa === 0 ? 'CPF' : 'CNPJ'}</label>
                                    <input type="text" name="nroDocumento" required
                                        value={nroDocumento}
                                        onChange={e => setNroDocumento(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                {tipoPessoa == 0 ?
                                    <div className="col s6">
                                        <label>Data Nasc.</label>
                                        <input type="date" name="dataNasc"
                                            value={dataNasc}
                                            onChange={e => setDataNasc(e.target.value)}
                                        />
                                    </div>
                                    :
                                    <></>
                                }
                                <div className="col s6">
                                    <label>Status</label>
                                    {status === 1 ?
                                        <select className="browser-default" name="status" required onChange={e => setStatus(e.target.value)}>
                                            <option value="1">Ativo</option>
                                            <option value="0">Inativo</option>
                                        </select>
                                        :
                                        <select className="browser-default" name="status" required onChange={e => setStatus(e.target.value)}>
                                            <option value="0">Inativo</option>
                                            <option value="1">Ativo</option>
                                        </select>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="input-field center-align col m6 s12">
                    <Link className="btn waves-effect waves-light grey darken-2" to="/novoendereco" onClick={saveOrUpdate}>Salvar</Link>
                </div>
                <div className="input-field center-align col m6 s12">
                    <Link className="btn waves-effect waves-light grey darken-2" to="/">Voltar</Link>
                </div>
            </div>
        </div>
    );
}