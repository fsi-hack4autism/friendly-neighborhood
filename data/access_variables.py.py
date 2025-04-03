import json

with open('sample.json', 'r') as file:
	data = json.load(file)


def find_by_user_id(user_id):
	"""Find user by their ID"""
	for user in data["users"]:
		if user["userId"] == user_id:
			print(f"Name: {user['fullName']}")
			print(f"Email: {user['email']}")
			print("-" * 50)


def find_by_email(email):
	"""Find user by email"""
	for user in data["users"]:
		if user["email"].lower() == email.lower():
			print(f"Name: {user['fullName']}")
			print(f"Phone: {user['phone']}")
			print("-" * 50)


def find_by_phone(phone):
	"""Find user by phone number"""
	for user in data["users"]:
		if user["phone"] == phone:
			print(f"Name: {user['fullName']}")
			print(f"Email: {user['email']}")
			print("-" * 50)


def find_by_location(city, state):
	"""Find users by city and state"""
	for user in data["users"]:
		if user["location"]["city"] == city and user["location"]["state"] == state:
			print(f"Name: {user['fullName']}")
			print(
			    f"Location: {user['location']['city']}, {user['location']['state']}")
			print("-" * 50)


def find_by_member_id(member_id):
	"""Find family member by their ID"""
	for user in data["users"]:
		for member in user["familyMembers"]:
			if member["memberId"] == member_id:
				print(f"Name: {member['fullName']}")
				print(f"Parent: {user['fullName']}")
				print("-" * 50)


def find_by_diagnosis_date(date):
	"""Find members by diagnosis date"""
	for user in data["users"]:
		for member in user["familyMembers"]:
			if member["diagnosis"]["diagnosisDate"] == date:
				print(f"Name: {member['fullName']}")
				print(f"Diagnosis Date: {member['diagnosis']['diagnosisDate']}")
				print(f"Clinician: {member['diagnosis']['diagnosingClinician']}")
				print("-" * 50)


def find_by_clinician(doctor_name):
	"""Find members by diagnosing clinician"""
	for user in data["users"]:
		for member in user["familyMembers"]:
			if member["diagnosis"]["diagnosingClinician"] == doctor_name:
				print(f"Name: {member['fullName']}")
				print(f"Clinician: {member['diagnosis']['diagnosingClinician']}")
				print("-" * 50)


def find_by_therapy_provider(provider):
	"""Find members by therapy provider"""
	for user in data["users"]:
		for member in user["familyMembers"]:
			for therapy in member["therapyAndInterventions"]:
				if therapy["provider"] == provider:
					print(f"Name: {member['fullName']}")
					print(f"Provider: {therapy['provider']}")
					print(f"Type: {therapy['type']}")
					print("-" * 50)


def find_by_special_interest(interest):
	"""Find members by special interest"""
	for user in data["users"]:
		for member in user["familyMembers"]:
			if member["behavioralCharacteristics"]["specialInterests"] == interest:
				print(f"Name: {member['fullName']}")
				print(
				    f"Interest: {member['behavioralCharacteristics']['specialInterests']}"
				)
				print("-" * 50)


def find_by_communication_method(method):
	"""Find members by communication method"""
	for user in data["users"]:
		for member in user["familyMembers"]:
			if member["dailyLivingSkills"]["communicationMethod"] == method:
				print(f"Name: {member['fullName']}")
				print(
				    f"Communication: {member['dailyLivingSkills']['communicationMethod']}"
				)
				print("-" * 50)


def find_willing_to_host():
	"""Find users willing to host meetups"""
	for user in data["users"]:
		if user["preferences"]["communityEngagement"]["willingToHostMeetups"]:
			print(f"Name: {user['fullName']}")
			print(f"Email: {user['email']}")
			print("-" * 50)


def find_by_therapy_frequency(frequency):
	"""Find members by therapy frequency"""
	for user in data["users"]:
		for member in user["familyMembers"]:
			for therapy in member["therapyAndInterventions"]:
				if therapy["frequency"] == frequency:
					print(f"Name: {member['fullName']}")
					print(f"Therapy: {therapy['type']}")
					print(f"Frequency: {therapy['frequency']}")
					print("-" * 50)


# Example usage
print("Finding user by ID:")
find_by_user_id("1")

print("\nFinding by email:")
find_by_email("alice.johnson@example.com")

print("\nFinding by provider:")
find_by_therapy_provider("Springfield Therapy Center")

print("\nFinding users willing to host:")
find_willing_to_host()

print("\nFinding by communication method:")
find_by_communication_method("Verbal")


def find_by_age(age):
	"""Find members by age"""
	for user in data["users"]:
		for member in user["familyMembers"]:
			if member["age"] == age:
				print(f"Name: {member['fullName']}")
				print(f"Age: {member['age']}")
				print("-" * 50)


def find_by_gender(gender):
    """Find members by gender"""
    for user in data["users"]:
        for member in user["familyMembers"]:
            if member["gender"] == gender:
                print(f"Name: {member['fullName']}")
                print(f"Gender: {member['gender']}")
                print("-" * 50)

def find_by_severity_level(level):
    """Find members by severity level"""
    for user in data["users"]:
        for member in user["familyMembers"]:
            if member["severityLevel"] == level:
                print(f"Name: {member['fullName']}")
                print(f"Severity: {member['severityLevel']}")
                print("-" * 50)

def find_by_sensory_sensitivity(sensitivity):
    """Find members by sensory sensitivity"""
    for user in data["users"]:
        for member in user["familyMembers"]:
            if member["behavioralCharacteristics"]["sensorySensitivities"] == sensitivity:
                print(f"Name: {member['fullName']}")
                print(f"Sensitivity: {member['behavioralCharacteristics']['sensorySensitivities']}")
                print("-" * 50)

def find_by_education_support(has_iep=None, has_504=None):
    """Find members by education support"""
    for user in data["users"]:
        for member in user["familyMembers"]:
            if has_iep is not None and member["educationAndSupport"]["IEP"] == has_iep:
                print(f"Name: {member['fullName']}")
                print(f"IEP: {member['educationAndSupport']['IEP']}")
                print("-" * 50)
            elif has_504 is not None and member["educationAndSupport"]["504Plan"] == has_504:
                print(f"Name: {member['fullName']}")
                print(f"504 Plan: {member['educationAndSupport']['504Plan']}")
                print("-" * 50)

def find_by_independence_level(level):
    """Find members by independence level"""
    for user in data["users"]:
        for member in user["familyMembers"]:
            if member["dailyLivingSkills"]["independenceLevel"] == level:
                print(f"Name: {member['fullName']}")
                print(f"Independence Level: {member['dailyLivingSkills']['independenceLevel']}")
                print("-" * 50)

def find_by_repetitive_behavior(behavior):
    """Find members by repetitive behavior"""
    for user in data["users"]:
        for member in user["familyMembers"]:
            if member["behavioralCharacteristics"]["repetitiveBehaviors"] == behavior:
                print(f"Name: {member['fullName']}")
                print(f"Behavior: {member['behavioralCharacteristics']['repetitiveBehaviors']}")
                print("-" * 50)

def find_by_social_communication(communication):
    """Find members by social communication pattern"""
    for user in data["users"]:
        for member in user["familyMembers"]:
            if member["behavioralCharacteristics"]["socialCommunication"] == communication:
                print(f"Name: {member['fullName']}")
                print(f"Communication: {member['behavioralCharacteristics']['socialCommunication']}")
                print("-" * 50)

def find_by_city(city):
    """Find users by city"""
    for user in data["users"]:
        if user["location"]["city"] == city:
            print(f"Name: {user['fullName']}")
            print(f"City: {user['location']['city']}")
            print("-" * 50)

def find_mentorship_seekers():
    """Find users looking for mentorship"""
    for user in data["users"]:
        if user["preferences"]["communityEngagement"]["lookingForMentorship"]:
            print(f"Name: {user['fullName']}")
            print(f"Email: {user['email']}")
            print("-" * 50)

def find_support_call_volunteers():
    """Find users available for support calls"""
    for user in data["users"]:
        if user["preferences"]["communityEngagement"]["availableForSupportCalls"]:
            print(f"Name: {user['fullName']}")
            print(f"Email: {user['email']}")
            print("-" * 50)

# Example usage of new functions
print("\nFinding by age:")
find_by_age(5)

print("\nFinding by severity level:")
find_by_severity_level("Level 2 - Requiring Substantial Support")

print("\nFinding mentorship seekers:")
find_mentorship_seekers()

print("\nFinding support call volunteers:")
find_support_call_volunteers()