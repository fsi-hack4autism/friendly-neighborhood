using System.Text.Json.Serialization;

public partial class AutismParentMatcher
{
    public class MedicalHistory
    {
        [JsonPropertyName("medications")] public List<string>? Medications { get; set; }
        [JsonPropertyName("allergies")] public string? Allergies { get; set; }
        [JsonPropertyName("otherMedicalConditions")] public string? OtherMedicalConditions { get; set; }
    }
}