using System.Text.Json.Serialization;

public partial class AutismParentMatcher
{
    public class BehavioralCharacteristics
    {
        [JsonPropertyName("socialCommunication")] public string? SocialCommunication { get; set; }
        [JsonPropertyName("repetitiveBehaviors")] public string? RepetitiveBehaviors { get; set; }
        [JsonPropertyName("sensorySensitivities")] public string? SensorySensitivities { get; set; }
        [JsonPropertyName("specialInterests")] public string? SpecialInterests { get; set; }
    }
}