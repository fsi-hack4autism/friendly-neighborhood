using System.Text.Json;
using System.Reflection;
public partial class AutismParentMatcher
{
    public async static Task<object> Match(string? experience)
    {
        string jsonFilePath = Path.Combine(AppContext.BaseDirectory, "sample.json");
        return await ProcessFile(jsonFilePath, experience!);
    }

   public async static Task<object> ProcessFile(string jsonFilePath, string experience)
{
    List<User> users = await LoadUsersFromJson(jsonFilePath);
    List<User> matchingUsers = FindMatchingUsers(users, experience);

    if (matchingUsers.Count > 0)
    {
        var result = new List<object>();
        foreach (var user in matchingUsers)
        {
            var userResult = new
            {
                FullName = user.FullName,
                Location = user.Location != null
                    ? new { user.Location.City, user.Location.State }
                    : null,
                Email = user.Email,
                Phone = user.Phone,
                Experiences = typeof(Experiences)
                    .GetProperties(BindingFlags.Public | BindingFlags.Instance)
                    .Where(prop => prop.PropertyType == typeof(bool) && prop.GetValue(user.Experiences) is bool value && value)
                    .Select(prop => prop.Name),
                Children = user.FamilyMembers?.Select(child => new
                {
                    child.FullName,
                    DiagnosingClinician = child.Diagnosis?.DiagnosingClinician
                })
            };

            result.Add(userResult);
        }

        return new { MatchingUsers = result };
    }
    else
    {
        return new { Message = "No matching families found." };
    }
}

    public async static Task<List<User>> LoadUsersFromJson(string filePath)
    {
        try
        {
            string json = await File.ReadAllTextAsync(filePath);
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            var jsonObject = JsonSerializer.Deserialize<Dictionary<string, List<User>>>(json, options);

            if (jsonObject != null && jsonObject.ContainsKey("users") && jsonObject["users"] != null)
            {
                return jsonObject["users"];
            }
            else
            {
                Console.WriteLine("Error: 'users' key not found or null in JSON.");
                return new List<User>();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error loading JSON: {ex.Message}");
            return new List<User>();
        }
    }

    public static List<User> FindMatchingUsers(List<User> users, string experience)
    {
        List<User> matchingUsers = new List<User>();

        foreach (var user in users)
        {
            var experienceProperty = typeof(Experiences).GetProperty(experience, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            if (experienceProperty != null && experienceProperty.PropertyType == typeof(bool))
            {
                bool hasExperience = experienceProperty.GetValue(user.Experiences) is bool value && value;
                if (hasExperience)
                {
                    matchingUsers.Add(user);
                }
            }
        }

        return matchingUsers;
    }
}