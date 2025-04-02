using System.Text.Json;

public class Program
{
    public static void Main(string[] args)
    {
        if (args.Length > 0 && int.TryParse(args[0], out int age))
        {
            var matchingRecords = GetRecordsByFamilyMemberAge(age);
            Console.WriteLine(JsonSerializer.Serialize(matchingRecords, new JsonSerializerOptions { WriteIndented = true }));
        }
        else
        {
            Console.WriteLine("Please provide a valid age as a command-line argument.");
        }
    }

    static List<string> GetRecordsByFamilyMemberAge(int age)
    {
        string filePath = Path.Combine(AppContext.BaseDirectory, "sample.json");
        string jsonData = File.ReadAllText(filePath);
        var data = JsonSerializer.Deserialize<JsonDocument>(jsonData);

        var matchingRecords = new List<string>();

        foreach (var user in data.RootElement.GetProperty("users").EnumerateArray())
        {
            foreach (var familyMember in user.GetProperty("familyMembers").EnumerateArray())
            {
                if (familyMember.GetProperty("age").GetInt32() == age)
                {
                    string userName = user.GetProperty("fullName").GetString();
                    string familyMemberName = familyMember.GetProperty("fullName").GetString();
                    matchingRecords.Add($"{userName} ({familyMemberName})");
                    break;
                }
            }
        }

        return matchingRecords;
    }
}
