using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Server.Helpers;
using Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using System;
using Microsoft.Extensions.Logging;
using Server.Interfaces;

namespace Server.Services
{
    public class TokenService : ITokenService
    {
        private readonly AppSettings _appSettings;
        private readonly ILogger<TokenService> _logger;

        // Inject AppSettings in constructor
        public TokenService(IOptions<AppSettings> appSettings, ILogger<TokenService> logger)
        {
            _logger = logger;
            _appSettings = appSettings.Value;
        }

        // https://jasonwatmore.com/post/2019/10/11/aspnet-core-3-jwt-authentication-tutorial-with-example-api
        public User Authenticate(User user)
        {
            // If the searched user doesn't exist in the database
            if (user == null) throw new ArgumentNullException(nameof(user));

            // If authentication is successful - proceed to generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Id),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(descriptor);
            user.Token = tokenHandler.WriteToken(token);

            _logger.LogInformation($"Generated token for: {user.AuId} - {user.Id}");

            return user;
        }
    }
}
