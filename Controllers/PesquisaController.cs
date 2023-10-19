using Microsoft.AspNetCore.Mvc;
using Biblioteca.Models;

namespace Biblioteca.Controllers
{
    public class PesquisaController : Controller
    {
        [HttpGet]
        public IActionResult Pesquisa( string pq)
        {
            List<LivroModel> resultadpsDaPesquisa = Resultados(pq);
            return View("ResultadosDaPesquisa", resultadpsDaPesquisa);
        }

        private List<LivroModel> Resultados(string pq) {

            var resultados  = new List<LivroModel>();
        
                if (!string.IsNullOrWhiteSpace(pq) )
            {
                resultados = resultados.Where(livro => livro.Autor.Contains(pq) || livro.Autor.Contains(pq)).ToList();
            }
                return resultados;
        
        }
    }
}
