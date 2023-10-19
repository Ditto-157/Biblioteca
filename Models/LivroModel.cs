using Microsoft.AspNetCore.Mvc;

namespace Biblioteca.Models
{


    public class LivroModel
    {

        public required string Titulo { get; set; }

        public required string Autor { get; set; }

        public required string Assunto { get; set; }

        public int NumEmp { get; set; }

        public bool PodeSolicitarEmprestimo { get; set; }

        public int Quantidade { get; set; }
      
    }

   


}


