using System.Text.Json.Serialization;

public partial class AutismParentMatcher
{
    public class FamilyMember
    {
        [JsonPropertyName("memberId")] public string? MemberId { get; set; }
        [JsonPropertyName("relationship")] public string? Relationship { get; set; }
        [JsonPropertyName("fullName")] public string? FullName { get; set; }
        [JsonPropertyName("dateOfBirth")] public string? DateOfBirth { get; set; }
        [JsonPropertyName("age")] public int Age { get; set; }
        [JsonPropertyName("gender")] public string? Gender { get; set; }
        [JsonPropertyName("diagnosis")] public Diagnosis? Diagnosis { get; set; }
        [JsonPropertyName("severityLevel")] public string? SeverityLevel { get; set; }
        [JsonPropertyName("coexistingConditions")] public List<string>? CoexistingConditions { get; set; }
        [JsonPropertyName("behavioralCharacteristics")] public BehavioralCharacteristics? BehavioralCharacteristics { get; set; }
        [JsonPropertyName("medicalHistory")] public MedicalHistory? MedicalHistory { get; set; }
        [JsonPropertyName("therapyAndInterventions")] public List<TherapyAndIntervention>? TherapyAndInterventions { get; set; }
        [JsonPropertyName("educationAndSupport")] public EducationAndSupport? EducationAndSupport { get; set; }
        [JsonPropertyName("dailyLivingSkills")] public DailyLivingSkills? DailyLivingSkills { get; set; }
    }
}