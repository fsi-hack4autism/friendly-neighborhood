using System.Text.Json.Serialization;

public partial class AutismParentMatcher
{
    public class Diagnosis
    {
        [JsonPropertyName("condition")] public string? Condition { get; set; }
        [JsonPropertyName("diagnosisDate")] public string? DiagnosisDate { get; set; }
        [JsonPropertyName("diagnosingClinician")] public string? DiagnosingClinician { get; set; }
        [JsonPropertyName("clinicalNotes")] public string? ClinicalNotes { get; set; }
    }
}