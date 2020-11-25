using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Primitives;

namespace Server.Interfaces
{
    public interface ITokenService
    {
        User Authenticate(User user);
    }
}
