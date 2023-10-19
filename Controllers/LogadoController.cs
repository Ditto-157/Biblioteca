using Biblioteca.Models;
using Microsoft.AspNetCore.Mvc;


namespace Biblioteca.Controllers
{
    public class LogadoController : Controller
    {
        public IActionResult HomeLogado()
        {
            ViewBag.HomeLogado = true;
            return View();

        }

    

        public IActionResult Conta()
        {
            ViewBag.HomeLogado = true;
            return View();
        }

        public IActionResult Favoritos()
        {
            ViewBag.HomeLogado = true;
            return View();
        }

        public IActionResult Emprestimos()
        {
            
            ViewBag.HomeLogado = true;
            return View();
        }
    }
}
