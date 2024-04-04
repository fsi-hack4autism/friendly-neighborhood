import json
import uuid
import random

# Sample data for different fields
diagnosis_summaries = [
    "Diagnosed with autism spectrum disorder (ASD). Requires specialized care and therapy.",
    "Recently diagnosed with autism spectrum disorder (ASD). Early intervention is recommended.",
    "Suspected autism spectrum disorder (ASD). Further evaluation recommended.",
    "Diagnosis of ASD confirmed after comprehensive evaluation. Requires support and intervention."
]

zip_codes = ["12345", "54321", "67890", "98765", "56789"]
genders = ["Male", "Female"]
siblings = ["No siblings", "1 younger sibling", "2 older siblings", "3 or more siblings"]
family_profiles = ["Married", "Divorced", "Single-parent", "Extended family"]
connection_levels = ["One-time advice", "Play date", "On-going", "Parent support group"]
language_preferences = ["English", "Spanish", "French", "Mandarin", "Other"]
connection_priorities = ["Similar family profile", "Lives nearby", "Similar diagnosis", "Shared interests"]

# Generate 1000 sample records
records = []
for _ in range(1000):
    record = {
        "PatientID": str(uuid.uuid4()),
        "Autism_Diagnosis_Summary": random.choice(diagnosis_summaries),
        "ZipCode": random.choice(zip_codes),
        "Age": random.randint(2, 18),
        "Gender": random.choice(genders),
        "Siblings": random.choice(siblings),
        "Family_Profile": random.choice(family_profiles),
        "Connection_Level": random.choice(connection_levels),
        "LanguagePreference": random.choice(language_preferences),
        "ContactPhoneNumber": f"{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}",
        "Email": f"user{random.randint(1, 1000)}@example.com",
        "Connection_Priority": random.choice(connection_priorities)
    }
    records.append(record)

# Write records to a JSON file
with open("autism_test_data.json", "w") as f:
    json.dump(records, f, indent=2)
