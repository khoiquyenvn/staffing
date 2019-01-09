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
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;

namespace KMS.Staffing.Logic.Bussiness
{
    public class EmployeeFiller
    {
        const int GENERATION_SAFE_GATE = 2000;
        private const int WAIT_PROCESSING = 30 * 1000;
        private readonly string avatarPath = ConfigurationManager.AppSettings["avatarPath"];

        public StaffingResult FillEmp(List<Request> activeRequests, List<Employee> employees)
        {
            var result = new StaffingResult();

            FillCandidates(activeRequests, employees);
            int expectedResult = CalExpectedScore(activeRequests);

            var staffingController = new StaffingController(activeRequests, expectedResult);

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
                Task.Run(() => ga.Start()).Wait(WAIT_PROCESSING);
                //ga.Start();
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
                Result = ProjectMainProperties(selectedEmployees),
                ExpectedResult = expectedResult,
                Fitness = bestChromosome.Fitness
            };
        }

        public List<Employee> ProjectMainProperties(List<Employee> employees)
        {
            return employees.Select(x => new Employee
            {
                Id = x.Id,
                TitleId = x.TitleId,
                MatchedResult = x.MatchedResult,
                Title = new Title
                {
                    Id = x.Title.Id,
                    Name = x.Title.Name
                },
                EmployeeSkill = x.EmployeeSkill.Select(s => new EmployeeSkill
                {
                    Id = s.Id,
                    EmployeeId = x.Id,
                    SkillId = s.SkillId,
                    Skill = new Skill { Id = s.SkillId, Name = s.Skill.Name }
                }).ToList(),
                Name = x.Name,
                Photo = x.Photo,
                PhotoURL = $"{avatarPath}{x.Photo}",
                DisplayId = x.Id.ToString("D" + 4),
                Email = x.Email
            }).ToList();
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

        public int CalExpectedScore(Request request)
        {
            if (request != null)
            {
                return CalExpectedScore(new List<Request> { request });
            }
            return 0;
        }

        public int CalExpectedScore(List<Request> requests)
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
