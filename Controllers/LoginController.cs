using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Biblioteca.Models;

namespace Biblioteca.Controllers
{
    public class LoginController : Controller
    {

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(LoginModel model) {
            
            List<string> rgsCadastrados = new List<string>
            {
                "123", "3112"
            };
            
            
            
                if (rgsCadastrados.Contains(model.RG))
                {
                        ViewBag.HomeLogado = true;
                        return View("~/Views/Logado/HomeLogado.cshtml");
                }
                    else
                    {
                        ViewBag.Mensagem = "RG tmnc";
                    }
            

            return View(model);
        }

      
       


            

    

        public IActionResult Cadastro()
        {
            return View();       
        }

        public IActionResult Cadastro2()
        {
            return View();
        }

        public IActionResult Cadastro3()
        {
            return View();
        }
    }
}
