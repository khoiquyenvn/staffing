﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Model
{
    public class EmpScore
    {
        public int EmpId { get; set; }
        public int Score { get; set; }
        public Guid MatchedRequest { get; set; }

        public override bool Equals(object obj)
        {
            if (!(obj is EmpScore target))
            {
                return false;
            }

            return Score.Equals(target.Score);
        }

        public override int GetHashCode()
        {
            var hashCode = 2146448725;            
            hashCode = hashCode * -1521134295 + Score.GetHashCode();
            //hashCode = hashCode * -1521134295 + EqualityComparer<Guid>.Default.GetHashCode(MatchedRequest);
            return hashCode;
        }
    }
}
