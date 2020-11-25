using Server.Helpers;
using System;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Server.Services;
using Xunit;
using Moq;
using Server.Models;

namespace Server.UnitTest.Services.Test
{
    public class TokenServiceTests
    {
        private readonly Mock<IOptions<AppSettings>> _appSettings;
        private readonly Mock<ILogger<TokenService>> _logger;

        public TokenServiceTests()
        {
            _logger = new Mock<ILogger<TokenService>>();
            _appSettings = new Mock<IOptions<AppSettings>>();
        }

        [Fact]
        public void Authenticate_UserNull_ThrowsArgumentNullException()
        {
            _appSettings.Setup(x => x.Value).Returns(new AppSettings{Secret = "Secret"});
            
            var sut = new TokenService(_appSettings.Object, null);

            var result = Assert.Throws<ArgumentNullException>(() => sut.Authenticate(null));

            Assert.NotNull(result);
            Assert.IsType<ArgumentNullException>(result);
        }

        [Theory]
        [InlineData(null, null)]
        [InlineData("id", null)]
        [InlineData(null, "role")]
        public void Authenticate_UserMissingProperties_ThrowsArgumentNullException(string id, string role)
        {
            _appSettings.Setup(x => x.Value).Returns(new AppSettings { Secret = "Secret" });

            var user = new User { Id = id, Role = role };
            var sut = new TokenService(_appSettings.Object, null);

            var result = Assert.Throws<ArgumentNullException>(() => sut.Authenticate(user));

            Assert.NotNull(result);
            Assert.IsType<ArgumentNullException>(result);
        }

        [Fact]
        public void Authenticate_UserValid_ReturnsNewToken()
        {
            _appSettings.Setup(x => x.Value).Returns(new AppSettings { Secret = "This is a secret key" });

            var user = new User { Id = "id", Role = "Role" };
            var sut = new TokenService(_appSettings.Object, _logger.Object);

            var result = sut.Authenticate(user);

            Assert.NotNull(result);
            Assert.IsType<User>(result);
            Assert.StartsWith("ey", result.Token);
        }
    }
}
