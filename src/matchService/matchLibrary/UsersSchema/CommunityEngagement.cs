using System.Text.Json.Serialization;

public partial class AutismParentMatcher
{
    public class CommunityEngagement
    {
        [JsonPropertyName("willingToHostMeetups")] public bool WillingToHostMeetups { get; set; }
        [JsonPropertyName("lookingForMentorship")] public bool LookingForMentorship { get; set; }
        [JsonPropertyName("availableForSupportCalls")] public bool AvailableForSupportCalls { get; set; }
    }
}