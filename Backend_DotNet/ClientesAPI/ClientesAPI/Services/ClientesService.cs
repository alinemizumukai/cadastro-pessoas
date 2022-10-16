using ClientesAPI.Context;
using ClientesAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ClientesAPI.Services
{    
    public class ClientesService : IClienteService
    {
        private readonly AppDbContext _context;

        public ClientesService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Cliente>> BuscarClientes()
        {
            try
            {
                return await _context.Clientes.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<Cliente>> BuscarClientesNome(string nome)
        {
            try
            {
                IEnumerable<Cliente> clientes;
                //Se informado um nome (parcial ou completo), retornar a lista de clientes que possuem esse nome 
                if (!string.IsNullOrWhiteSpace(nome))
                {
                    clientes = await _context.Clientes.Where(n => n.Nome.Contains(nome)).ToListAsync();
                }
                //Não havendo clientes com o nome, retornar a lista inicial
                else
                {
                    clientes = await BuscarClientes();
                }
                return clientes;
            }
            catch
            {
                throw;
            }
        }
        public async Task<Cliente> BuscarClienteId(int id)
        {
            try
            {
                var cliente = await _context.Clientes.FindAsync(id);
                return cliente;
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<Cliente>> BuscarClienteDoc(string nroDocumento)
        {
            IEnumerable<Cliente> clientes;
            //Se informado um documento (parcial ou completo), retornar a lista de clientes que possuem esse documento
            if (!string.IsNullOrWhiteSpace(nroDocumento))
            {
                clientes = await _context.Clientes.Where(d => d.NroDocumento.Contains(nroDocumento)).ToListAsync();
            }
            //Não havendo clientes com o nro documento, retornar a lista inicial
            else
            {
                clientes = await BuscarClientes();
            }
            return clientes;
        }

        public async Task<IEnumerable<Cliente>> BuscarClientesStatus(int status)
        {
            try
            {
                IEnumerable<Cliente> clientes;
                //Retorna os clientes inativos 
                if (status == 0)
                {
                    clientes = await _context.Clientes.Where(s => s.Status.Equals(status)).ToListAsync();
                }
                //Retorna os clientes ativos
                else if(status == 1)
                {
                    clientes = await _context.Clientes.Where(s => s.Status.Equals(status)).ToListAsync();
                }
                //Retorna todos os clientes
                else
                {
                    clientes = await BuscarClientes();
                }
                return clientes;
            }
            catch
            {
                throw;
            }
        }

        public async Task CriarCliente(Cliente cliente)
        {
            try
            {
                _context.Clientes.Add(cliente);
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }
        public async Task AtualizarCliente(Cliente cliente)
        {
            try
            {
                _context.Entry(cliente).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task DeletarCliente(Cliente cliente)
        {
            try
            {
                _context.Clientes.Remove(cliente);
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }


    }
}
