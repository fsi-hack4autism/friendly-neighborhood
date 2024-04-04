import pyodbc

#Connection string
connection_string = "CONNECTION_STRING"

# Connect to Azure SQL Database using connection string
def connect_to_database():
    try:
        conn = pyodbc.connect(connection_string)
        print("Connected to Azure SQL Database successfully")
        return conn
    except Exception as e:
        print("Error connecting to database:", e)
        return None

#CREATE TABLE TestData (
#     PatientID UNIQUEIDENTIFIER PRIMARY KEY,
#     Relationship NVARCHAR(50),
#     ZipCode NVARCHAR(10),
#     Age INT,
#     Gender NVARCHAR(10),
#     Diagnosis NVARCHAR(1000),
#     LanguagePreference NVARCHAR(50),
#     Summary NVARCHAR(MAX),
#     ContactPhoneNumber NVARCHAR(15),
#     Email NVARCHAR(100)
# );


# CREATE TABLE ProfileData (
#     PatientID UNIQUEIDENTIFIER PRIMARY KEY,
#     Autism_Diagnosis_Summary NVARCHAR(MAX),
#     ZipCode NVARCHAR(10),
#     Age INT,
#     Gender NVARCHAR(10),
#     Siblings NVARCHAR(100),
#     Family_Profile NVARCHAR(50),
#     Connection_Level NVARCHAR(100),
#     LanguagePreference NVARCHAR(50),
#     ContactPhoneNumber NVARCHAR(15),
#     Email NVARCHAR(100),
#     Connection_Priority NVARCHAR(10)  
# );

# Function to insert test data into database
def insert_test_data(data):
    conn = connect_to_database()
    if conn is None:
        return False, "Failed to connect to database"

    try:
        cursor = conn.cursor()
        for record in data:
            # Extract data from JSON
            patient_id = record.get('PatientID')
            relationship = record.get('Relationship')
            zip_code = record.get('ZipCode')
            age = record.get('Age')
            gender = record.get('Gender')
            diagnosis = record.get('Diagnosis')
            language_preference = record.get('LanguagePreference')
            summary = record.get('Summary')
            contact_phone_number = record.get('ContactPhoneNumber')
            email = record.get('Email')

            # Insert record into database
            cursor.execute("INSERT INTO TestData (PatientID, Relationship, ZipCode, Age, Gender, Diagnosis, LanguagePreference, Summary, ContactPhoneNumber, Email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (patient_id, relationship, zip_code, age, gender, diagnosis, language_preference, summary, contact_phone_number, email))
        conn.commit()
        return True, "Test data inserted successfully"
    except Exception as e:
        return False, str(e)
    finally:
        conn.close()

# Function to read records from database
def read_records_from_database():
    conn = connect_to_database()
    if conn is None:
        return []

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT PatientID, Relationship, ZipCode, Age, Gender, Diagnosis, LanguagePreference, Summary, ContactPhoneNumber, Email FROM TestData")
        records = cursor.fetchall()
        return records
    except Exception as e:
        print("Error reading records from database:", e)
        return []
    finally:
        conn.close()

def read_profile_data_from_database():
    conn = connect_to_database()
    if conn is None:
        return []

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT PatientID, Autism_Diagnosis_Summary, ZipCode, Age, Gender, Siblings, Family_Profile, Connection_Level, LanguagePreference, ContactPhoneNumber, Email, Connection_Priority FROM ProfileData")
        records = cursor.fetchall()
        return records
    except Exception as e:
        print("Error reading records from database:", e)
        return []
    finally:
        conn.close()

def insert_profile_data_db(profile_data):
    conn = connect_to_database()
    if conn is None:
        return False, "Failed to connect to database"

    try:
        cursor = conn.cursor()
        
        if isinstance(profile_data, list):
            # Insert multiple records
            for data in profile_data:
                cursor.execute("INSERT INTO ProfileData (PatientID, Autism_Diagnosis_Summary, ZipCode, Age, Gender, Siblings, Family_Profile, Connection_Level, LanguagePreference, ContactPhoneNumber, Email, Connection_Priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                               (data['PatientID'], data['Autism_Diagnosis_Summary'], data['ZipCode'], data['Age'], data['Gender'], data['Siblings'], data['Family_Profile'], data['Connection_Level'], data['LanguagePreference'], data['ContactPhoneNumber'], data['Email'], data['Connection_Priority']))
        else:
            # Insert single record
            cursor.execute("INSERT INTO ProfileData (PatientID, Autism_Diagnosis_Summary, ZipCode, Age, Gender, Siblings, Family_Profile, Connection_Level, LanguagePreference, ContactPhoneNumber, Email, Connection_Priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                           (profile_data['PatientID'], profile_data['Autism_Diagnosis_Summary'], profile_data['ZipCode'], profile_data['Age'], profile_data['Gender'], profile_data['Siblings'], profile_data['Family_Profile'], profile_data['Connection_Level'], profile_data['LanguagePreference'], profile_data['ContactPhoneNumber'], profile_data['Email'], profile_data['Connection_Priority']))
        
        conn.commit()
        return True, "Data inserted successfully"
    except Exception as e:
        return False, str(e)
    finally:
        conn.close()

