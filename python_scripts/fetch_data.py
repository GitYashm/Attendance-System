import pymongo
import pandas as pd
import os

client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = client['attendance_db']
collection = db['attendances']

# Fetch attendance records
def fetch_attendance_records():
    records = list(collection.find())
    df = pd.DataFrame(records)
    return df

if _name_ == "_main_":
    attendance_df = fetch_attendance_records()
    print(attendance_df)