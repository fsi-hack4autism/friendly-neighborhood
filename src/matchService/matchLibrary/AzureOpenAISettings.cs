public class AzureOpenAISettings
{
    public required string Endpoint { get; set; }
    public required string ApiKey { get; set; }
    public required string DeploymentName { get; set; }
    public float Temperature { get; set; } = 0.2f;
    public float TopP { get; set; } = 1.0f;
    public float FrequencyPenalty { get; set; } = 0.0f;
    public float PresencePenalty { get; set; } = 0.0f;
    public int MaxOutputTokenCount { get; set; } = 100;
    public required string MatchPromptUrl { get; set; }
    public required string UsersJsonUrl { get; set; }
}