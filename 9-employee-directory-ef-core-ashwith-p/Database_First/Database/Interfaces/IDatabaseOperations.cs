﻿using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IDatabaseOperations
    {

        public IEnumerable<string> GetStaticData(string role);

    }
}
