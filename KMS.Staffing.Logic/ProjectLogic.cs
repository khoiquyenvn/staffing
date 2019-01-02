using GeneticSharp.Domain;
using GeneticSharp.Domain.Populations;
using GeneticSharp.Runner.ConsoleApp.Samples;
using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic
{
    public class ProjectLogic : IProjectLogic
    {
        readonly IProjectRepository projectRepository;
        readonly IEmployeeRepository employeeRepository;

        public ProjectLogic(IProjectRepository projectRepository, IEmployeeRepository employeeRepository)
        {
            this.projectRepository = projectRepository;
            this.employeeRepository = employeeRepository;
        }

        public string test(string name)
        {
            return $"Hello {name} at";
        }

        public int CountProjects()
        {
            return projectRepository.GetProjects().Count();            
        }

        public List<Project> GetProjects()
        { 
            return projectRepository.GetProjects().ToList();
        }

        public int FillEmp(Guid projectId)
        {
            var result = 0;
            // pass list of emps and project's need to controller

            var employees = employeeRepository.GetEmployees();


            var sampleController = new EqualitySampleController();

            var selection = sampleController.CreateSelection();
            var crossover = sampleController.CreateCrossover();
            var mutation = sampleController.CreateMutation();
            var fitness = sampleController.CreateFitness();
            var population = new Population(100, 200, sampleController.CreateChromosome());
            population.GenerationStrategy = new PerformanceGenerationStrategy();

            var ga = new GeneticAlgorithm(population, fitness, selection, crossover, mutation);
            ga.Termination = sampleController.CreateTermination();

            //var terminationName = ga.Termination.GetType().Name;

            ga.GenerationRan += delegate
            {
                //var bestChromosome = ga.Population.BestChromosome;
                //Console.WriteLine("Termination: {0}", terminationName);
                //Console.WriteLine("Generations: {0}", ga.Population.GenerationsNumber);
                //Console.WriteLine("Fitness: {0,10}", bestChromosome.Fitness);
                //Console.WriteLine("Time: {0}", ga.TimeEvolving);
                //sampleController.Draw(bestChromosome);
            };

            ga.TerminationReached += delegate
            {
                var bestChromosome = ga.Population.BestChromosome;
                //Console.WriteLine("Termination: {0}", terminationName);
                //Console.WriteLine("Generations: {0}", ga.Population.GenerationsNumber);
                //Console.WriteLine("Fitness: {0,10}", bestChromosome.Fitness);
                //Console.WriteLine("Time: {0}", ga.TimeEvolving);
                //sampleController.Draw(bestChromosome); 

                result = 1;
            };

            try
            {
                sampleController.ConfigGA(ga);
                ga.Start();
            }
            catch (Exception ex)
            {
                throw;
            }

            return result;
        }
    }
}
