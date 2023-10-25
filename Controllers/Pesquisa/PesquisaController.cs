using Microsoft.AspNetCore.Mvc;
using Biblioteca.Models;

namespace Biblioteca.Controllers
{
    public class PesquisaController : Controller
    {
        private readonly List<LivroModel> livros;

        public PesquisaController()
        {
            livros = new List<LivroModel>
            {
                new LivroModel { Titulo = "Berserk", Autor = "Kentaro Miura"},
                new LivroModel { Titulo = "One Piece", Autor = "Oda"}
            };
        }

        [HttpGet]
        public PartialViewResult PesquisarLivros(string pq)
        {
            var resultados = livros.Where(livro => livro.Titulo.Contains(pq, StringComparison.OrdinalIgnoreCase) || livro.Autor.Contains(pq, StringComparison.OrdinalIgnoreCase)).ToList();
            return PartialView("Components/Pesquisa/Default", resultados);
        }
    }

}