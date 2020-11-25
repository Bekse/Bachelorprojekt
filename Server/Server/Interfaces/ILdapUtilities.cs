using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Interfaces
{
    public interface ILdapUtilities
    {
        bool IsAuthenticated(string auid, string password);
        bool IsAuthenticatedLdap(string auid, string password);
    }
}
