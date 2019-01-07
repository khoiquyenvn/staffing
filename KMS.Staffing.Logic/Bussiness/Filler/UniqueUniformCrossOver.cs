using GeneticSharp.Domain.Chromosomes;
using GeneticSharp.Domain.Crossovers;
using GeneticSharp.Domain.Randomizations;
using KMS.Staffing.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic.Bussiness
{
    public class UniqueUniformCrossOver : CrossoverBase
    {
        #region Constructors
        /// <summary>
        /// Initializes a new instance of the <see cref="GeneticSharp.Domain.Crossovers.UniformCrossover"/> class.
        /// </summary>
        /// <param name="mixProbability">The mix probability. he default mix probability is 0.5.</param>
        public UniqueUniformCrossOver(float mixProbability)
            : base(2, 2)
        {
            MixProbability = mixProbability;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="GeneticSharp.Domain.Crossovers.UniformCrossover"/> class.
        /// <remarks>
        /// The default mix probability is 0.5.
        /// </remarks>
        /// </summary>
        public UniqueUniformCrossOver() : this(0.5f)
        {
        }
        #endregion

        #region Properties
        /// <summary>
        /// Gets or sets the mix probability.
        /// </summary>
        /// <value>The mix probability.</value>
        public float MixProbability { get; set; }
        #endregion

        #region Methods
        /// <summary>
        /// Performs the cross with specified parents generating the children.
        /// </summary>
        /// <param name="parents">The parents chromosomes.</param>
        /// <returns>The offspring (children) of the parents.</returns>
        protected override IList<IChromosome> PerformCross(IList<IChromosome> parents)
        {
            var firstParent = parents[0];
            var secondParent = parents[1];
            var firstChild = firstParent.Clone();
            var secondChild = secondParent.Clone();

            for (int i = 0; i < firstParent.Length; i++)
            {
                if (RandomizationProvider.Current.GetDouble() > MixProbability)
                {
                    SafeReplace(firstChild, i, secondParent.GetGene(i));
                    SafeReplace(secondChild, i, firstParent.GetGene(i));
                }
            }

            return new List<IChromosome> { firstChild, secondChild };
        }
        #endregion

        /// <summary>
        /// Make sure that gene is just replaced only if replaced one does not contain the same gene
        /// Ex: R(1,2,3) will ignore 3 and accept 4
        /// </summary>
        /// <param name="replacedOne"></param>
        /// <param name="index"></param>
        /// <param name="gene"></param>
        /// <returns></returns>
        private bool SafeReplace(IChromosome replacedOne, int index, Gene gene)
        {
            bool hasAlreadyExist = replacedOne.GetGenes().Any(x => (x.Value as EmpScore).EmpId == (gene.Value as EmpScore).EmpId);

            if (!hasAlreadyExist)
            {
                replacedOne.ReplaceGene(index, gene);
                return true;
            }

            return false;
        }
    }
}



