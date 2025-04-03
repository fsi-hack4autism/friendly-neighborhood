using System.Text.Json.Serialization;

public partial class AutismParentMatcher
{
    public class Preferences
    {
        [JsonPropertyName("preferredMatchCriteria")] public PreferredMatchCriteria? PreferredMatchCriteria { get; set; }
        [JsonPropertyName("communityEngagement")] public CommunityEngagement? CommunityEngagement { get; set; }
    }
}