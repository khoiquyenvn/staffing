using GeneticSharp.Domain.Chromosomes;
using GeneticSharp.Domain.Fitnesses;
using GeneticSharp.Extensions.Mathematic;
using KMS.Staffing.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic.Bussiness
{
    public class StaffingFitness : IFitness
    {
        private readonly int expectedResult;

        public StaffingFitness(int expectedResult)
        {
            this.expectedResult = expectedResult;
        }

        public static int GetEquationResult(StaffingChromosome specialEqualityChromosome)
        {
            var genes = specialEqualityChromosome.GetGenes();

            return genes.Sum(x => (x.Value as EmpScore).Score);
        }

        public double Evaluate(IChromosome chromosome)
        {
            var equalityChromosome = chromosome as StaffingChromosome;

            var fitness = Math.Abs(GetEquationResult(equalityChromosome) - expectedResult);

            return fitness * -1;           
        }
    }
}
