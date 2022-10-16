using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ClientesAPI.Models
{
    [Table("Clientes")]
    public class Cliente
    {
        [Key]
        public int ClienteId { get; set; }

        [Required(ErrorMessage = "Preencha o nome.")]
        [StringLength(50, ErrorMessage = "O campo pode ter no máximo 50 caracteres.")]
        public string Nome { get; set; }

        [Required]
        public int TipoPessoa { get; set; }

        [Required(ErrorMessage = "Preencha o número do documento.")]
        [StringLength(20, ErrorMessage = "O campo pode ter no máximo 20 caracteres.")]
        public string NroDocumento { get; set; }

        public DateTime DataNasc { get; set; }

        public int Status { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CriadoEm { get; set; } = DateTime.UtcNow;

        //ICollection no lugar de List?
        public List<Endereco> Enderecos { get; set; }
    }
}
