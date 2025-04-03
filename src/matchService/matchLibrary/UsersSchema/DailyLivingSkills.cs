using System.Text.Json.Serialization;

public partial class AutismParentMatcher
{
    public class DailyLivingSkills
    {
        [JsonPropertyName("independenceLevel")] public string? IndependenceLevel { get; set; }
        [JsonPropertyName("communicationMethod")] public string? CommunicationMethod { get; set; }
        [JsonPropertyName("employmentStatus")] public string? EmploymentStatus { get; set; }
        [JsonPropertyName("housingSituation")] public string? HousingSituation { get; set; }
    }
}