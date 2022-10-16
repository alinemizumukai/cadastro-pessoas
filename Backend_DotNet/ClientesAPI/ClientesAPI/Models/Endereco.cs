using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ClientesAPI.Models
{
    [Table("Enderecos")]
    public class Endereco
    {
        [Key]
        public int EndId { get; set; }

        [Required]
        public Cliente Cliente { get; set; }

        [Required(ErrorMessage = "Preencha o endereço.")]
        [StringLength(50, ErrorMessage = "O campo pode ter no máximo 50 caracteres.")]
        public string Logradouro { get; set; }

        [Required(ErrorMessage = "Preencha o número.")]
        public int Numero { get; set; }

        [StringLength(50, ErrorMessage = "O campo pode ter no máximo 50 caracteres.")]
        public string Complemento { get; set; }

        [Required(ErrorMessage = "Preencha o bairro.")]
        [StringLength(50, ErrorMessage = "O campo pode ter no máximo 50 caracteres.")]
        public string Bairro { get; set; }

        [Required(ErrorMessage = "Preencha o CEP.")]
        [StringLength(10, ErrorMessage = "O campo pode ter no máximo 10 caracteres.")]
        public string Cep { get; set; }

        [Required(ErrorMessage = "Preencha a cidade.")]
        [StringLength(50, ErrorMessage = "O campo pode ter no máximo 50 caracteres.")]
        public string Cidade { get; set; }

        [Required(ErrorMessage = "Preencha o estado.")]
        [StringLength(30, ErrorMessage = "O campo pode ter no máximo 30 caracteres.")]
        public string Estado { get; set; }
    }
}
