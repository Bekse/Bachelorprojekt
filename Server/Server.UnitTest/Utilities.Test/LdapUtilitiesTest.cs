using System;
using System.Collections.Generic;
using System.Text;
using Moq;
using Server.Interfaces;
using Server.Utilities;
using Xunit;

namespace Server.UnitTest.Utilities.Test
{
    public class LdapUtilitiesTest
    {
        private readonly Mock<ILdapUtilities> _ldapUtilities;

        public LdapUtilitiesTest()
        {
            _ldapUtilities = new Mock<ILdapUtilities>();
        }

        [Theory]
        [InlineData(null, null)]
        [InlineData("auId", null)]
        [InlineData(null, "password")]
        public void IsAuthenticated_NullParams_ThrowsArgumentNullException(string auId, string password)
        {
            var sut = new LdapUtilities();

            var result = Assert.Throws<ArgumentNullException>(() => sut.IsAuthenticated(auId, password));

            Assert.NotNull(result);
            Assert.IsType<ArgumentNullException>(result);
        }

        [Fact]
        public void IsAuthenticated_ValidParams_ReturnsTrue()
        {
            _ldapUtilities.Setup(x => x.IsAuthenticatedLdap(It.IsAny<string>(), It.IsAny<string>())).Returns(true);
            _ldapUtilities.Setup(x => x.IsAuthenticated(It.IsAny<string>(), It.IsAny<string>())).Returns(true);

            var sut = _ldapUtilities.Object;

            var result = sut.IsAuthenticated("auId", "correct password");

            Assert.True(result);
            Assert.IsType<bool>(result);
        }

        [Fact]
        public void IsAuthenticated_WrongPassword_ReturnsFalse()
        {
            _ldapUtilities.Setup(x => x.IsAuthenticatedLdap(It.IsAny<string>(), It.IsAny<string>())).Returns(false);

            var sut = _ldapUtilities.Object;

            var result = sut.IsAuthenticated("auId", "wrong password");

            Assert.False(result);
            Assert.IsType<bool>(result);
        }

        [Theory]
        [InlineData(null, null)]
        [InlineData("auId", null)]
        [InlineData(null, "password")]
        public void IsAuthenticatedLdap_NullParams_ThrowsArgumentNullException(string auId, string password)
        {
            var sut = new LdapUtilities();

            var result = Assert.Throws<ArgumentNullException>(() => sut.IsAuthenticatedLdap(auId, password));

            Assert.NotNull(result);
            Assert.IsType<ArgumentNullException>(result);
        }

        [Fact]
        public void IsAuthenticatedLdap_ValidParams_ReturnsTrue()
        {
            _ldapUtilities.Setup(x => x.IsAuthenticatedLdap(It.IsAny<string>(), It.IsAny<string>())).Returns(true);

            var sut = _ldapUtilities.Object;

            var result = sut.IsAuthenticatedLdap("auId", "correct password");

            Assert.True(result);
            Assert.IsType<bool>(result);
        }

        [Fact]
        public void IsAuthenticatedLdap_WrongPassword_ReturnsFalse()
        {
            _ldapUtilities.Setup(x => x.IsAuthenticatedLdap(It.IsAny<string>(), It.IsAny<string>())).Returns(false);

            var sut = _ldapUtilities.Object;

            var result = sut.IsAuthenticatedLdap("auId", "wrong password");

            Assert.False(result);
            Assert.IsType<bool>(result);
        }

        [Theory]
        [InlineData("correct", "wrong")]
        [InlineData("wrong", "correct")]
        [InlineData("wrong", "wrong")]
        public void IsAuthenticatedLdap_InvalidCredentials_ReturnsFalse(string auId, string password)
        {
            _ldapUtilities.Setup(x => x.IsAuthenticatedLdap(It.IsAny<string>(), It.IsAny<string>())).Returns(false);

            var sut = _ldapUtilities.Object;

            var result = sut.IsAuthenticatedLdap(auId, password);

            Assert.False(result);
            Assert.IsType<bool>(result);
        }
    }
}
