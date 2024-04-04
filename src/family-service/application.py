from flask import Flask, jsonify, request
from database import *
from embedding import *
import json
import uuid
from testdatageneration import *

from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, origins=['http://localhost:8000', '*']) #update this later

# Endpoint for connection testing
@app.route("/")
def hello():
    print("Hello World Prints!!")
    return "Hello World!"

# Endpoint to insert test records. Sample generated from Chat GPT stored in test-data.json
@app.route("/insert-records", methods=['POST'])
def insert_test_records():
    data = request.json.get('data', [])
    success, message = insert_test_data(data)
    if success:
        return jsonify({'message': message}), 200
    else:
        return jsonify({'error': message}), 500


# Load the data from the JSON file
with open("autism_test_data.json", "r") as file:
    profile_data = json.load(file)

# Endpoint to insert test records. Sample generated from Chat GPT stored in test-data.json
@app.route("/insert-profile-data", methods=['POST'])
def insert_profile_data():
    

    # # print(f"Profile data {profile_data}")
    # # Insert the test data into the Azure SQL Database
    # success, message = insert_profile_data(profile_data)
    # Insert each record from the profile_data list into the Azure SQL Database
    success_count = 0
    for record in profile_data:
        print(f"{record}")
        success, message = insert_profile_data_db(record)
        if success:
            success_count += 1
        else:
            print(f"Failed to insert record: {message}")

    print(f"{success_count} records inserted successfully.")
    # if success:
    #     return jsonify({'message': message}), 200
    # else:
    return jsonify({'message': "Records Inserted Successfully"}), 200


# Endpoint to fetch all test data records
@app.route("/get-test-data", methods=['GET'])
def get_test_data():
    records = read_records_from_database()
    print(records)
    if not records:
        return jsonify({'error': 'No records found'}), 404
    # # Convert records to dictionary format for JSON response
    formatted_records = [{'PatientID': str(PatientID), 'Relationship': Relationship,
                          'ZipCode': ZipCode, 'Age': Age, 'Gender': Gender,
                            'Diagnosis': Diagnosis, 'LanguagePreference': LanguagePreference,
                           'Summary': Summary, 'ContactPhoneNumber' : ContactPhoneNumber, 'Email': Email} 
                         for PatientID, Relationship, ZipCode, Age, Gender, Diagnosis, LanguagePreference, Summary, 
                         ContactPhoneNumber, Email in records]
                        #  for patient_id, summary in records]
    return jsonify(formatted_records), 200


@app.route("/get-profile-data", methods=['GET'])
def get_profile_data():
    records = read_profile_data_from_database()
    if not records:
        return jsonify({'error': 'No records found'}), 404

    formatted_records = [{'PatientID': str(PatientID), 'Autism_Diagnosis_Summary': Autism_Diagnosis_Summary,
                          'ZipCode': ZipCode, 'Age': Age, 'Gender': Gender,
                          'Siblings': Siblings, 'Family_Profile': Family_Profile,
                          'Connection_Level': Connection_Level, 'LanguagePreference': LanguagePreference,
                          'ContactPhoneNumber': ContactPhoneNumber, 'Email': Email, 'Connection_Priority': Connection_Priority}
                         for PatientID, Autism_Diagnosis_Summary, ZipCode, Age, Gender, Siblings, Family_Profile,
                             Connection_Level, LanguagePreference, ContactPhoneNumber, Email, Connection_Priority in records]

    return jsonify(formatted_records), 200

@app.route("/insert-generate-and-index", methods=['POST'])
def insert_generate_and_index():
    try:
        data_from_database = read_records_from_database()
        print("Data from Database")
        # print(data_from_database)
        records_with_embeddings = []
        for record in data_from_database:
            # print("Record ==")
            # print(record)
            # print("==")
            text = record.Summary  

            embedding = generate_embedding_and_metadata(text)
            print("Embedding Generated")
            # print(type(embedding))
            # embedding_str = json.dumps(embedding)
            # print(embedding_str)
            # print("==")
            # Convert embedding to string representation
            # print(type(list(embedding)))
            embedding_str = ','.join(map(str, embedding))
            record_with_embedding = {
                'id': str(uuid.uuid4()),
                'PatientID': record.PatientID,
                'Relationship': record.Relationship,
                'ZipCode': record.ZipCode,
                'Age': record.Age,
                'Gender': record.Gender,
                'Diagnosis': record.Diagnosis,
                'LanguagePreference': record.LanguagePreference,
                'Summary': text,
                'ContactPhoneNumber': record.ContactPhoneNumber,
                'Email': record.Email,
                'Embedding': list(embedding)
                # 'Embedding_string': embedding_str#list(embedding)#json.dumps([{"Embedding":list(embedding)}])#embedding_str
            }
            records_with_embeddings.append(record_with_embedding)


        # print(f"records_with_embeddings ====== {records_with_embeddings}")
        # print("==azure_search_client==")
        # print(azure_search_client)
        response = azure_search_client.upload_documents(documents=records_with_embeddings)
        print("Response ===")
        print(response)
        # Check if documents were successfully uploaded
        success_count = 0
        for result in response:
            if result.succeeded:
                success_count += 1
            else:
                print(f"Result=={result}")
                print(f"Failed to upload document: {result.key}")
        
        print(f"{success_count} documents uploaded successfully.")
    except Exception as e:
        print(f"Error uploading documents: {e}")
    return jsonify({'message': 'Test data inserted, embeddings generated, and indexed successfully'}), 200


@app.route("/insert-generate-and-index-profile-table", methods=['POST'])
def insert_generate_and_index_profile_table():
    try:
        # Fetch data from the new table
        data_from_database = read_profile_data_from_database()
        print("Data from Database")

        # Initialize a list to store records with embeddings
        records_with_embeddings = []

        # Iterate through each record from the database
        for record in data_from_database:
            # Extract relevant data from the record
            # Adjust the field names as per your new table schema
            text = record.Autism_Diagnosis_Summary
            embedding = generate_embedding_and_metadata(text)

            # Convert embedding to string representation
            # Adjust the field name 'Embedding' based on your new table schema
            embedding_list = list(embedding)
            embedding_str = ','.join(map(str, embedding_list))

            # Create a dictionary to store the record with embeddings
            # Adjust the field names as per your new table schema
            record_with_embedding = {
            'id': str(uuid.uuid4()),
            'PatientID': record.PatientID,
            'Autism_Diagnosis_Summary': record.Autism_Diagnosis_Summary,
            'ZipCode': record.ZipCode,
            'Age': record.Age,
            'Gender': record.Gender,
            'Siblings': record.Siblings,
            'Family_Profile': record.Family_Profile,
            'Connection_Level': record.Connection_Level,
            'LanguagePreference': record.LanguagePreference,
            'ContactPhoneNumber': record.ContactPhoneNumber,
            'Email': record.Email,
            'Connection_Priority': record.Connection_Priority,
            'Embedding': embedding_list
        }


            # Append the record with embeddings to the list
            records_with_embeddings.append(record_with_embedding)

        # Upload documents with embeddings to Azure Search
        response = azure_search_client_profile.upload_documents(documents=records_with_embeddings)
        print("Response ===")
        print(response)

        # Check if documents were successfully uploaded
        success_count = 0
        for result in response:
            if result.succeeded:
                success_count += 1
            else:
                print(f"Failed to upload document: {result.key}")

        print(f"{success_count} documents uploaded successfully.")
    except Exception as e:
        print(f"Error uploading documents: {e}")

    return jsonify({'message': 'Test data inserted, embeddings generated, and indexed successfully'}), 200


# @app.route("/insert-generate-and-index-json", methods=['POST'])
# def insert_generate_and_index_json():
#     # Open the JSON file in read mode
#     with open('test-data.json', 'r') as file:
#     # Load the JSON data from the file
#         data = json.load(file)

#     data_from_database = data['data']
#     print(data_from_database)
#     records_with_embeddings = []
#     for record in data_from_database:
#         text = record['Summary'] 

#         embedding = generate_embedding_and_metadata(text)
#         # Convert embedding to string representation
#         # embedding_str = ','.join(map(str, embedding))
#         # embedding_str = 
#         record_with_embedding = {
#             'id': str(uuid.uuid4()),
#             'PatientID': record['PatientID'],
#             'Relationship': record['Relationship'],
#             'ZipCode': record['ZipCode'],
#             'Age': record['Age'],
#             'Gender': record['Gender'],
#             'Diagnosis': record['Diagnosis'],
#             'LanguagePreference': record['LanguagePreference'],
#             'Summary': text,
#             'ContactPhoneNumber': record['ContactPhoneNumber'],
#             'Email': record['Email'],
#             # 'embedding': 0.0,
#             'Embedding_string': json.dumps(embedding)
#         }
#         records_with_embeddings.append(record_with_embedding)

#     response = azure_search_client.upload_documents(documents=records_with_embeddings)
#     print("Response ===")
#     print(response)
#     # if response.results[0].succeeded:
#     #     print("Documents uploaded successfully.")
#     # else:
#     #     print("Failed to upload documents.")
#     return jsonify({'message': 'Test data inserted, embeddings generated, and indexed successfully'}), 200


@app.route("/search-similar-old", methods=['POST'])
def search_similar_old():
    query_text = request.json.get('query_text', '')
    print(query_text)
    results = []
    response = search_similar_text_old(query_text)
    for result in response:
        print(result)
        results.append(result)
    
    return jsonify(results), 200

@app.route("/search-similar", methods=['POST'])
def search_similar():
    query_text = request.json.get('query_text', '')
    print(query_text)
    results = []
    response = search_similar_text(query_text)
    for result in response:
        print(result)
        results.append(result)
    
    return jsonify(results), 200

if __name__ == '__main__':
    app.run(debug=True)
