using Biblioteca.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Diagnostics;

namespace Biblioteca.Controllers
{
    public class HomeController : Controller
    {

       
       
        private readonly ILogger<HomeController> _logger;

       

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public ActionResult Index()
        {
            
            return View();
        }
    }
}