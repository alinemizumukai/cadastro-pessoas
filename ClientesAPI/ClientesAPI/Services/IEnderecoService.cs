using ClientesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClientesAPI.Services
{
    public interface IEnderecoService
    {
        Task<Endereco> BuscarEnderecoId(int id);
        Task CriarEndereco(Endereco endereco);
        Task AtualizarEndereco(Endereco endereco);
        Task DeletarEndereco(Endereco endereco);
    }
}
