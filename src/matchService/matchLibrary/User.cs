using System.Text.Json.Serialization;

public partial class AutismParentMatcher
{
    public class User
    {
        [JsonPropertyName("userId")] public string? UserId { get; set; }
        [JsonPropertyName("fullName")] public string? FullName { get; set; }
        [JsonPropertyName("email")] public string? Email { get; set; }
        [JsonPropertyName("phone")] public string? Phone { get; set; }
        [JsonPropertyName("location")] public Location? Location { get; set; }
        [JsonPropertyName("familyMembers")] public List<FamilyMember>? FamilyMembers { get; set; }
        [JsonPropertyName("preferences")] public Preferences? Preferences { get; set; }
        [JsonPropertyName("experiences")] public Experiences? Experiences { get; set; }
    }
}