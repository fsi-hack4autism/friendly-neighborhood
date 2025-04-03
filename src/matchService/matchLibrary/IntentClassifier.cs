using System.Text;
using System.Text.Json;

public static class IntentClassifier
{
    public static async Task<string> ClassifyIntent(string userQuery, AzureOpenAISettings settings)
    {
        string promptTemplate = await File.ReadAllTextAsync("prompt.txt");
        string prompt = promptTemplate.Replace("{userQuery}", userQuery);

        return await Chat.SendChatMessage(prompt, settings);
    }
}