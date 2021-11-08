using ClientesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClientesAPI.Services
{
    public interface IClienteService
    {
        Task<IEnumerable<Cliente>> BuscarClientes();
        Task<IEnumerable<Cliente>> BuscarClientesNome(string nome);
        Task<Cliente> BuscarClienteId(int id);
        Task<IEnumerable<Cliente>> BuscarClienteDoc(string nroDocumento);
        Task<IEnumerable<Cliente>> BuscarClientesStatus(int status);
        Task CriarCliente(Cliente cliente);
        Task AtualizarCliente(Cliente cliente);
        Task DeletarCliente(Cliente cliente);

    }
}
