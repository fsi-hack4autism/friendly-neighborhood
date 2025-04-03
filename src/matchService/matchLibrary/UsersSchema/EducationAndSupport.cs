using System.Text.Json.Serialization;

public partial class AutismParentMatcher
{
    public class EducationAndSupport
    {
        [JsonPropertyName("IEP")] public bool IEP { get; set; }
        [JsonPropertyName("504Plan")] public bool _504Plan { get; set; }
        [JsonPropertyName("schoolAccommodations")] public string? SchoolAccommodations { get; set; }
        [JsonPropertyName("supportServices")] public List<string>? SupportServices { get; set; }
    }
}