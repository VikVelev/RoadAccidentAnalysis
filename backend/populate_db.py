import psycopg2
from csv import reader
  
conn = psycopg2.connect(
    database="postgres",
    user='postgres', password='postgres',
    host='0.0.0.0'
)

conn.autocommit = True
cursor = conn.cursor()
  
cursor.execute('DROP TABLE IF EXISTS road_accidents_table')

sql = '''CREATE TABLE IF NOT EXISTS road_accidents_table(Location_Easting_OSGR int,
Location_Northing_OSGR int,
Longitude float, Latitude float, Accident_Severity int, Number_of_Vehicles int, Number_of_Casualties int, Date date, 
Day_of_Week int, Time time, "Local_Authority_(District)" int, "Local_Authority_(Highway)" VARCHAR(20), "1st_Road_Class" int,
"1st_Road_Number" int, Road_Type int, Speed_limit int, Junction_Detail int, Junction_Control int, "2nd_Road_Class" int, "2nd_Road_Number" int,
Light_Conditions int, Weather_Conditions int, Road_Surface_Conditions int, Urban_or_Rural_Area int, Casualty_Severity int, Casualty_Type int, Junction_Location int);'''

cursor.execute(sql)
dp_path = './db/dataset.csv'

cursor.execute('SET datestyle = dmy;');

with open(dp_path, 'r') as read_obj:
    csv_reader = reader(read_obj)
    i = -1
    insert_queries = []
    for row in csv_reader:
        i += 1
        if (i == 0): continue
        # row variable is a list that represents a row in csv
        insert_query = "INSERT INTO road_accidents_table VALUES (%s, %s, %s, %s, %s, %s, %s, '%s', %s, '%s', %s, '%s', %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)" % tuple(list(map(lambda x: x if x is not '' else 'null', row)))
        cursor.execute(insert_query)
        conn.commit();
        print(i);

conn.close()