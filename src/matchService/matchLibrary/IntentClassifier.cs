using System.Text;
using System.Text.Json;

public static class IntentClassifier
{
    public static async Task<string> ClassifyIntent(string userQuery, AzureOpenAISettings settings)
    {
        using var httpClient = new HttpClient();
        string promptTemplate = await httpClient.GetStringAsync(settings.MatchPromptUrl);
        string prompt = promptTemplate.Replace("{userQuery}", userQuery);

        return await Chat.SendChatMessage(prompt, settings);
    }
}