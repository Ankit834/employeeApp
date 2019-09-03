using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeApi.Model;
using EmployeeApi.Model.ViewModel;
using EmployeeApi.Model.DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using EmployeeApi.Auth;
using Microsoft.Extensions.Options;
using EmployeeApi.Helpers;
using System.Security.Claims;
using Newtonsoft.Json;

namespace EmployeeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        //private readonly EmployeeContext _empContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;

        public AccountsController(UserManager<AppUser> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody]RegisterRequestViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new AppUser { FirstName = model.FirstName, LastName = model.LastName, UserName = model.Email, Email = model.Email };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody]CredentialsViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);
            if (identity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
            }

            var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, credentials.UserName, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });
            return new OkObjectResult(jwt);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // get the user to verifty
            var userToVerify = await _userManager.FindByNameAsync(userName);

            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            // check the credentials
            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}