using System;
using System.Collections.Generic;
using System.ComponentModel;
using GeneticSharp.Domain;
using GeneticSharp.Domain.Chromosomes;
using GeneticSharp.Domain.Crossovers;
using GeneticSharp.Domain.Fitnesses;
using GeneticSharp.Domain.Mutations;
using GeneticSharp.Domain.Terminations;
using GeneticSharp.Extensions.Mathematic;
using KMS.Staffing.Core.Model;
using KMS.Staffing.Logic.Bussiness;

namespace GeneticSharp.Runner.ConsoleApp.Samples
{
    /// <summary>
    /// Sample based on this paper: Genetic Algorithm for Solving Simple Mathematical Equality Problem.
    /// <see href="http://arxiv.org/ftp/arxiv/papers/1308/1308.4675.pdf" />
    /// </summary>    
    public class StaffingController : SampleControllerBase
    {
        private readonly List<Request> requests;
        private readonly int expectedScore;

        public StaffingController(List<Request> requests, int expectedScore)
        {
            this.requests = requests;
            this.expectedScore = expectedScore;
        }

        #region Fields
        private StaffingFitness m_fitness;
        #endregion

        #region Methods        
        /// <summary>
        /// Creates the chromosome.
        /// </summary>
        /// <returns>The sample chromosome.</returns>
        public override IChromosome CreateChromosome()
        {
            return new StaffingChromosome(requests, expectedScore);
        }

        /// <summary>
        /// Creates the fitness.
        /// </summary>
        /// <returns>The fitness.</returns>
        public override IFitness CreateFitness()
        {
            m_fitness = new StaffingFitness(expectedScore);
            return m_fitness;
        }

        public override IMutation CreateMutation()
        {
            return new TworsMutation();
        }

        public override ICrossover CreateCrossover()
        {
            return new UniqueUniformCrossOver();
        }

        /// <summary>
        /// Draws the specified best chromosome.
        /// </summary>
        /// <param name="bestChromosome">The best chromosome.</param>
        public override void Draw(IChromosome bestChromosome)
        {
            var best = bestChromosome as StaffingChromosome;

            var genes = best.GetGenes();
            //Console.WriteLine("Equation: {0} + 2*{1} + 3*{2} + 4*{3} = {4}", genes[0], genes[1], genes[2], genes[3], EqualityFitness.GetEquationResult(best));
        }

        /// <summary>
        /// Creates the termination.
        /// </summary>
        /// <returns>
        /// The termination.
        /// </returns>
        public override ITermination CreateTermination()
        {
            return new FitnessThresholdTermination(0);
        }
        #endregion
    }
}
