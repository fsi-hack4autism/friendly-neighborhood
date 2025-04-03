using System.Text.Json.Serialization;

public partial class AutismParentMatcher
{
    public class TherapyAndIntervention
    {
        [JsonPropertyName("type")] public string? Type { get; set; }
        [JsonPropertyName("provider")] public string? Provider { get; set; }
        [JsonPropertyName("frequency")] public string? Frequency { get; set; }
        [JsonPropertyName("startDate")] public string? StartDate { get; set; }
    }
}