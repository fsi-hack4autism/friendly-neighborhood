using OpenAI.Chat;
using Azure.AI.OpenAI;
using Azure;
public static class Chat
{
    public static async Task<string> SendChatMessage(string prompt, AzureOpenAISettings settings)
    {
        var endpoint = new Uri(settings.Endpoint);
        var deploymentName = settings.DeploymentName;
        var apiKey = settings.ApiKey;

        AzureOpenAIClient azureClient = new(
            endpoint,
            new AzureKeyCredential(apiKey));
        ChatClient chatClient = azureClient.GetChatClient(deploymentName);

        var requestOptions = new ChatCompletionOptions()
        {
            Temperature = settings.Temperature,
            TopP = settings.TopP,
            FrequencyPenalty = settings.FrequencyPenalty,
            PresencePenalty = settings.PresencePenalty,
            MaxOutputTokenCount = settings.MaxOutputTokenCount
        };

        List<ChatMessage> messages = new List<ChatMessage>()
        {
            new SystemChatMessage("You are a helpful assistant."),
            new UserChatMessage(prompt),
        };

        var response = await chatClient.CompleteChatAsync(messages, requestOptions);
        return response.Value.Content.First().Text;
    }

}
