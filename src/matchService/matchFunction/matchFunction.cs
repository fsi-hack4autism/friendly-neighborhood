using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Functions.Worker;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace src
{
    public class matchFunction
    {
        private readonly ILogger<matchFunction> _logger;
        private readonly AzureOpenAISettings _openAISettings;
        public matchFunction(ILogger<matchFunction> logger, IConfiguration configuration)
        {
            _logger = logger;
            _openAISettings = new AzureOpenAISettings
            {
                Endpoint = configuration["Endpoint"] ?? throw new InvalidOperationException("Endpoint is missing in configuration."),
                ApiKey = configuration["ApiKey"] ?? throw new InvalidOperationException("ApiKey is missing in configuration."),
                DeploymentName = configuration["DeploymentName"] ?? throw new InvalidOperationException("DeploymentName is missing in configuration."),
                Temperature = float.TryParse(configuration["Temperature"], out var temperature) ? temperature : throw new InvalidOperationException("Temperature is missing or invalid in configuration."),
                TopP = float.TryParse(configuration["TopP"], out var topP) ? topP : throw new InvalidOperationException("TopP is missing or invalid in configuration."),
                FrequencyPenalty = float.TryParse(configuration["FrequencyPenalty"], out var frequencyPenalty) ? frequencyPenalty : throw new InvalidOperationException("FrequencyPenalty is missing or invalid in configuration."),
                PresencePenalty = float.TryParse(configuration["PresencePenalty"], out var presencePenalty) ? presencePenalty : throw new InvalidOperationException("PresencePenalty is missing or invalid in configuration."),
                MaxOutputTokenCount = int.TryParse(configuration["MaxOutputTokenCount"], out var maxOutputTokenCount) ? maxOutputTokenCount : throw new InvalidOperationException("MaxOutputTokenCount is missing or invalid in configuration.")
            };

        }

        [Function("matchFunction")]
        public async Task<IActionResult> RunAsync([HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequest req)
        {
            _logger.LogInformation("Processing request...");

            // Get the 'prompt' parameter from the query string
            string prompt = req.Query["prompt"]!;

            if (string.IsNullOrWhiteSpace(prompt))
            {
                return new BadRequestObjectResult("The 'prompt' query parameter is required.");
            }

            string result = await IntentClassifier.ClassifyIntent(prompt, _openAISettings);

            var matchedUsers = AutismParentMatcher.Match(result);
            string jsonResult = JsonSerializer.Serialize(matchedUsers, new JsonSerializerOptions
            {
                WriteIndented = true // For pretty-printing
            });

            return new OkObjectResult(jsonResult);
        }
    }
}
