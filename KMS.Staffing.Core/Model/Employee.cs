﻿using KMS.Staffing.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Core.Model
{
    [Table("Employee")]
    public class Employee
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public Guid TitleId { get; set; }

        [ForeignKey(nameof(TitleId))]
        public virtual Title Title { get; set; }

        [NotMapped]
        public string DisplayId { get; set; }

        [NotMapped]
        public string PhotoURL { get; set; }
        public virtual ICollection<EmployeeSkill> EmployeeSkill { get; set; }

        [NotMapped]
        public MatchedResult MatchedResult { get; set; }
        
        public int CalScore(Request request)
        {
            var score = 0;

            // just title
            if (request.Type == (int)RequestType.Title)
            {
                if (request.RequestDetails.FirstOrDefault()?.TitleId == TitleId)
                {
                    score++;
                }
            }
            else if (request.Type == (int)RequestType.Both && request.RequestDetails.Any())
            {
                bool matchedTitle = request.RequestDetails.First().TitleId == TitleId;

                if (matchedTitle)
                {
                    // title and skill                
                    request
                        .RequestDetails
                        .ForEach(skill =>
                        {
                        // score for title
                        //score++;

                        if (EmployeeSkill.Any(y => y.SkillId.Equals(skill.SkillId)))
                            {
                            // score for each matched skill
                            score++;
                            }
                        });
                }
                
            }

            return score;
        }
    }
}
