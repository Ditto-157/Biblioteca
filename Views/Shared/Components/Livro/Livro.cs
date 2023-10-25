using Microsoft.AspNetCore.Mvc;
using Biblioteca.Models;

namespace Biblioteca.Views.Shared.Components.Livro
{



    public class LivroViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            List<LivroModel> livro = new List<LivroModel>
            {
                new LivroModel { Titulo = "Berserk", Assunto = "Manga", Autor = "Kentaro Miura", NumEmp = 3 },
                new LivroModel { Titulo = "One Piece", Assunto = "Manga", Autor = "Oda", NumEmp = 0 },
                new LivroModel { Titulo = "Painkiller", Assunto = "Musica", Autor = "Judas Priest", NumEmp = 1 },
                new LivroModel { Titulo = "Noites Brancas", Assunto = "Romance", Autor = "Dostoievk", NumEmp = 0 },
                new LivroModel { Titulo = "As paradas", Assunto = "Não faço ideia", Autor = "o cara", NumEmp = 2}
            };

            return View("Default", livro);
        }
    }
}
