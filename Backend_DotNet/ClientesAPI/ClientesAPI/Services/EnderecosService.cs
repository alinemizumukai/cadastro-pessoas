using ClientesAPI.Context;
using ClientesAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClientesAPI.Services
{
    public class EnderecosService : IEnderecoService
    {
        private readonly AppDbContext _context;

        public EnderecosService(AppDbContext context)
        {
            _context = context;
        }

       //Buscar endereço por idCliente?
        public async Task<Endereco> BuscarEnderecoId(int id)
        {
            try
            {
                var endereco = await _context.Enderecos.FindAsync(id);
                return endereco;
            }
            catch
            {
                throw;
            }
        }
        public async Task CriarEndereco(Endereco endereco)
        {
            try
            {
                _context.Enderecos.Add(endereco);
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }
        public async Task AtualizarEndereco(Endereco endereco)
        {
            try
            {
                _context.Entry(endereco).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task DeletarEndereco(Endereco endereco)
        {
            try
            {
                _context.Enderecos.Remove(endereco);
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }
    }
}
