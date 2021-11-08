using ClientesAPI.Models;
using ClientesAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClientesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnderecosController : ControllerBase
    {
        private IEnderecoService _enderecoService;

        public EnderecosController(IEnderecoService enderecoService)
        {
            _enderecoService = enderecoService;
        }

        [HttpGet("{id:int}", Name = "BuscarEnderecoId")]
        public async Task<ActionResult<Endereco>> BuscarEnderecoId(int id)
        {
            try
            {
                var endereco = await _enderecoService.BuscarEnderecoId(id);
                if (endereco == null)
                    return NotFound($"Não existe endereço com o id = {id}.");

                return Ok(endereco);
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpPost]
        public async Task<ActionResult> CriarEndereco(Endereco endereco)
        {
            try
            {
                await _enderecoService.CriarEndereco(endereco);
                return CreatedAtRoute(nameof(BuscarEnderecoId), new { id = endereco.EndId }, endereco);
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> EditarEndereco(int id, [FromBody] Endereco endereco)
        {
            try
            {
                if (endereco.EndId == id)
                {
                    await _enderecoService.AtualizarEndereco(endereco);
                    return Ok("Endereço atualizado com sucesso.");
                }
                else
                {
                    return BadRequest("Endereço não encontrado");
                }
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeletarEndereco(int id)
        {
            try
            {
                var endereco = await _enderecoService.BuscarEnderecoId(id);

                if (endereco != null)
                {
                    await _enderecoService.DeletarEndereco(endereco);
                    return Ok("Endereço deletado com sucesso.");
                }
                else
                {
                    return NotFound("Endereço não encontrado.");
                }
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }
    }
}
