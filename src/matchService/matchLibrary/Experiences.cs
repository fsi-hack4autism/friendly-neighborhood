using System.Text.Json.Serialization;

public partial class AutismParentMatcher
{
    public class Experiences
    {
        [JsonPropertyName("FinancialAid")] public bool FinancialAid { get; set; }
        [JsonPropertyName("ChildCare")] public bool ChildCare { get; set; }
        [JsonPropertyName("TherapyMethods")] public bool TherapyMethods { get; set; }
        [JsonPropertyName("Schooling")] public bool Schooling { get; set; }
        [JsonPropertyName("medicalAndDoctors")] public bool MedicalAndDoctors { get; set; }
        [JsonPropertyName("Other")] public string? Other { get; set; }
    }
}