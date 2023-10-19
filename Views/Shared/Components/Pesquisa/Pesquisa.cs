using Microsoft.AspNetCore.Mvc;

namespace Biblioteca.Views.Shared.Components.Pesquisa
{
    public class PesquisaViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
          
            return View();
        }
    }
}
