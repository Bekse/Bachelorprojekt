using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Enums
{
    public enum Role
    {
        [Description("Admin")]
        Admin,
        [Description("Staff")]
        Staff,
        [Description("Clerk")]
        Clerk,
        [Description("Student")]
        Student
    }
}
