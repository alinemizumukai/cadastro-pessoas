using ClientesAPI.Models;
using ClientesAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ClientesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Produces("application/json")] //Retorna os dados no formato json (padrão)
    public class ClientesController : ControllerBase
    {
        private IClienteService _clienteService;

        public ClientesController(IClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IAsyncEnumerable<Cliente>>> BuscarClientes()
        {
            try
            {
                var clientes = await _clienteService.BuscarClientes();
                return Ok(clientes);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Erro ao obter os clientes");
            }
        }

        [HttpGet("ClientesPorNome")]
        public async Task<ActionResult<IAsyncEnumerable<Cliente>>> BuscarClientesNome([FromQuery] string nome)
        {
            try
            {
                var clientes = await _clienteService.BuscarClientesNome(nome);

                if (clientes.Count() == 0)
                    return NotFound($"Não existem clientes com o nome {nome}.");

                return Ok(clientes);
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpGet("{id:int}", Name = "BuscarClienteId")]
        public async Task<ActionResult<Cliente>> BuscarClienteId(int id)
        {
            try
            {
                var cliente = await _clienteService.BuscarClienteId (id);
                if (cliente == null)
                    return NotFound($"Não existe cliente com o id = {id}.");

                return Ok(cliente);
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpGet("ClientesPorDocumento")]
        public async Task<ActionResult<IAsyncEnumerable<Cliente>>> BuscarClienteDoc([FromQuery] string nroDocumento)
        {
            try
            {
                var clientes = await _clienteService.BuscarClienteDoc(nroDocumento);

                if (clientes.Count() == 0)
                    return NotFound($"Não existem clientes com o número de documento {nroDocumento}.");

                return Ok(clientes);
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpGet("ClientesPorStatus")]
        public async Task<ActionResult<IAsyncEnumerable<Cliente>>> BuscarClientesStatus([FromQuery] int status)
        {
            try
            {
                var clientes = await _clienteService.BuscarClientesStatus(status);

                if (clientes.Count() == 0)
                    return NotFound($"Não existem clientes com o status definido.");

                return Ok(clientes);
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpPost]
        public async Task<ActionResult> CriarCliente(Cliente cliente)
        {
            try
            {
                await _clienteService.CriarCliente(cliente);                
                return CreatedAtRoute(nameof(BuscarClienteId), new { id = cliente.ClienteId }, cliente);
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> EditarCliente(int id, [FromBody] Cliente cliente)
        {
            try
            {
                if (cliente.ClienteId == id)
                {
                    await _clienteService.AtualizarCliente(cliente);
                    return Ok("Cliente atualizado com sucesso.");
                }
                else
                {
                    return BadRequest("Cliente não encontrado");
                }
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeletarCliente(int id)
        {
            try
            {
                var cliente = await _clienteService.BuscarClienteId(id);

                if(cliente != null)
                {
                    await _clienteService.DeletarCliente(cliente);
                    return Ok("Cliente deletado com sucesso.");
                }
                else
                {
                    return NotFound("Cliente não encontrado.");
                }
            }
            catch 
            {
                return BadRequest("Request inválido");
            }
        }
    }
}

