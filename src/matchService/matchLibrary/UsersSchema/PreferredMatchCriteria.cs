using System.Text.Json.Serialization;

public partial class AutismParentMatcher
{
    public class PreferredMatchCriteria
    {
        [JsonPropertyName("locationProximity")] public bool LocationProximity { get; set; }
        [JsonPropertyName("similarSeverityLevel")] public bool SimilarSeverityLevel { get; set; }
        [JsonPropertyName("sharedInterests")] public bool SharedInterests { get; set; }
        [JsonPropertyName("similarAgeGroup")] public bool SimilarAgeGroup { get; set; }
    }
}