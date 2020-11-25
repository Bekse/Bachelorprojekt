using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Threading.Tasks;
using Server.Interfaces;

namespace Server.Utilities
{
    // Taget fra den nuværende Embedded Stock - Tilføjet nullchecks
    public class LdapUtilities : ILdapUtilities
    {
        public bool IsAuthenticated(string auid, string password)
        {
            if (auid == null) throw new ArgumentNullException(nameof(auid));
            if (password == null) throw new ArgumentNullException(nameof(password));

            var authenticated = IsAuthenticatedLdap(auid, password);
            if (!authenticated)
            {
                auid = auid + "@uni.au.dk";
                authenticated = IsAuthenticatedLdap(auid, password);
            }

            return authenticated;
        }

        public bool IsAuthenticatedLdap(string auid, string password)
        {
            if (auid == null) throw new ArgumentNullException(nameof(auid));
            if (password == null) throw new ArgumentNullException(nameof(password));

            try
            {
                var userEntry = new DirectoryEntry("LDAP://uni.au.dk ", auid, password);
                var nativeObject = userEntry.NativeObject;
                var name = userEntry.Name;
            }
            catch (DirectoryServicesCOMException ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return true;
        }
    }
}
