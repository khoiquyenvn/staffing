using System;
using System.Collections.Generic;
using System.Linq;
using GeneticSharp.Domain.Chromosomes;
using GeneticSharp.Domain.Randomizations;
using KMS.Staffing.Core.Model;

namespace GeneticSharp.Extensions.Mathematic
{
    /// <summary>
    /// An equation chromosome.
    /// </summary>
    public class StaffingChromosome : ChromosomeBase
    {
        private readonly List<Request> requests;
        private readonly int expectedResult;

        #region Constructors        
        /// <summary>
        /// Initializes a new instance of the <see cref="EquationChromosome"/> class.
        /// </summary>
        /// <param name="expectedResult">The equation expected result.</param>
        /// <param name="variablesNumber">The equation variables number.</param>
        public StaffingChromosome(List<Request> requests, int expectedResult) : base(requests.Sum(x => x.Number))
        {
            this.requests = requests;
            this.expectedResult = expectedResult;

            var index = 0;

            requests.ForEach(x => {
                if (x.Candidates.Count < x.Number)
                {
                    throw new Exception($"There are not enough candidates for this title - {x.RequestDetails.FirstOrDefault()?.Title?.Name}.");
                }

                for (int i = 0; i < x.Number; i++)
                {
                    FlattenRequests.Add(x);
                    ReplaceGene(index, GenerateGene(index));

                    // increase index counter
                    index++;
                }
            });
        }
        #endregion

        #region Properties
        public List<Request> FlattenRequests { get; set; } = new List<Request>();
        public List<EmpScore> ResultRange { get; set; } = new List<EmpScore>();
        #endregion

        #region Methods        
        /// <summary>
        /// Creates the new.
        /// </summary>
        /// <returns>The new chromosome.</returns>
        public override IChromosome CreateNew()
        {
            return new StaffingChromosome(requests, expectedResult);
        }
       
        /// <summary>
        /// Generates the gene.
        /// </summary>
        /// <param name="geneIndex">Index of the gene.</param>
        /// <returns>The generated gene.</returns>
        public override Gene GenerateGene(int geneIndex)
        {
            var request = FlattenRequests[geneIndex];
            EmpScore selectedCandidate = null;

            // loop until get available candidate 
            // who was NOT be chosen for the chromosome
            do
            {
                int random = RandomizationProvider.Current.GetInt(0, request.Candidates.Count);
                selectedCandidate = request.Candidates[random];
            }
            while (ResultRange.Any(x => x.EmpId == selectedCandidate.EmpId));

            ResultRange.Add(selectedCandidate);
            return new Gene(selectedCandidate);
        }
        #endregion
    }
}
