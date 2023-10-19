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
                new LivroModel { Titulo = "Berserk", Assunto = "Manga", Autor = "Kentaro Miura" },
                new LivroModel { Titulo = "One Piece", Assunto = "Manga", Autor = "Oda" },
                new LivroModel { Titulo = "Painkiller", Assunto = "Musica", Autor = "Judas Priest" },
                new LivroModel { Titulo = "Noites Brancas", Assunto = "Romance", Autor = "Dostoievk" }
            };

            return View("Default", livro);
        }
    }
}
