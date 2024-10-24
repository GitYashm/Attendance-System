import pandas as pd
import matplotlib.pyplot as plt
from fetch_data import fetch_attendance_records

# Load attendance data
attendance_df = fetch_attendance_records()

# Display the first few records
attendance_df.head()

# Attendance status distribution
status_counts = attendance_df['status'].value_counts()
plt.figure(figsize=(8, 6))
status_counts.plot(kind='bar', color=['green', 'red', 'orange'])
plt.title('Attendance Status Distribution')
plt.xlabel('Status')
plt.ylabel('Count')
plt.show()