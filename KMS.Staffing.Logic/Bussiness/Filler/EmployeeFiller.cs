using GeneticSharp.Domain;
using GeneticSharp.Domain.Populations;
using GeneticSharp.Extensions.Mathematic;
using GeneticSharp.Runner.ConsoleApp.Samples;
using KMS.Staffing.Core.Contracts;
using KMS.Staffing.Core.Enums;
using KMS.Staffing.Core.Model;
using KMS.Staffing.Core.Model.ApiResponse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic.Bussiness
{
    public class EmployeeFiller
    {
        const int GENERATION_SAFE_GATE = 2000;
        private const int WAIT_PROCESSING = 30 * 1000;

        public StaffingResult FillEmp(Guid sessionPlanId, List<SessionPlan> sessionPlans, List<Employee> employees)
        {
            var result = new StaffingResult();

            var activeRequests = sessionPlans
                .First()
                .Requests
                .Where(x => x.Status == (int)RequestStatus.Active)
                .ToList();

            FillCandidates(activeRequests, employees);
            List<Request> requests = sessionPlans.First().Requests;

            int expectedResult = CalExpectedScore(activeRequests);

            var staffingController = new StaffingController(requests, expectedResult);

            var selection = staffingController.CreateSelection();
            var crossover = staffingController.CreateCrossover();
            var mutation = staffingController.CreateMutation();
            var fitness = staffingController.CreateFitness();
            var population = new Population(100, 200, staffingController.CreateChromosome());
            population.GenerationStrategy = new PerformanceGenerationStrategy();

            var ga = new GeneticAlgorithm(population, fitness, selection, crossover, mutation);
            ga.MutationProbability = 0;
            ga.Termination = staffingController.CreateTermination();

            ga.GenerationRan += delegate
            {
                // force GA stop when hit safe gate
                if (ga.Population.GenerationsNumber >= GENERATION_SAFE_GATE)
                {
                    result = ProcessTerminationResult(employees, ga, expectedResult, activeRequests);
                    ga.Stop();
                }
            };

            ga.TerminationReached += delegate
            {
                result = ProcessTerminationResult(employees, ga, expectedResult, activeRequests);
            };

            try
            {
                staffingController.ConfigGA(ga);
                //Task.Run(() => ga.Start()).Wait(WAIT_PROCESSING);
                ga.Start();
            }
            catch (Exception ex)
            {
                throw;
            }

            return result;
        }

        private StaffingResult ProcessTerminationResult(
            List<Employee> employees, 
            GeneticAlgorithm ga, 
            int expectedResult, 
            List<Request> processRequested)
        {
            List<Employee> selectedEmployees;
            var bestChromosome = ga.Population.BestChromosome;
            var resultRange = (bestChromosome as StaffingChromosome).GetGenes();

            selectedEmployees = resultRange.Select(x =>
            {
                var genValue = x.Value as EmpScore;
                var employee = employees.SingleOrDefault(y => y.Id == genValue.EmpId);

                if (employee != null)
                {
                    employee.MatchedResult = new MatchedResult
                    {
                        MatchedScore = genValue.Score,
                        MatchedRequest = genValue.MatchedRequest,
                        RequestExpectedScore = CalExpectedScore(processRequested.FirstOrDefault(r => r.Id == genValue.MatchedRequest))
                    };
                }

                return employee;

            }).ToList();

            return new StaffingResult
            {
                Result = selectedEmployees,
                ExpectedResult = expectedResult,
                Fitness = bestChromosome.Fitness
            };
        }

        private void FillCandidates(List<Request> activeRequests, List<Employee> employees)
        {
            activeRequests.ForEach(x =>
            {
                x.Candidates = new List<EmpScore>();

                employees.ForEach(e =>
                {
                    int score = e.CalScore(x);

                    if (score > 0)
                    {
                        x.Candidates.Add(new EmpScore { EmpId = e.Id, Score = score, MatchedRequest = x.Id });
                    }
                });
            });
        }

        private int CalExpectedScore(Request request)
        {
            if (request != null)
            {
                return CalExpectedScore(new List<Request> { request });
            }
            return 0;
        }

        private int CalExpectedScore(List<Request> requests)
        {
            var titlesOnly = requests.Where(x => x.Type == (int)RequestType.Title).ToList();
            var titleAndSkills = requests.Where(x => x.Type == (int)RequestType.Both).ToList();

            var scores = 0;

            // cal expected score for title only requests
            scores += titlesOnly.Sum(x => x.Number);

            // cal expected score for title and skill requests
            titleAndSkills.ForEach(x => {

                // add one score for title
                //scores += x.Number;

                // and one for each required skill
                scores += x.RequestDetails.Count * x.Number;
            });

            return scores;
        }
    }
}
