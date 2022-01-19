import psycopg2
  
conn = psycopg2.connect(database="RoadAccidentsDB",
                        user='postgres', password='mitkopostgres', 
                        host='localhost'
)
  
conn.autocommit = True
cursor = conn.cursor()
  
  
sql = '''CREATE TABLE IF NOT EXISTS RoadAccidentsTable(Location_Easting_OSGR int,
Location_Northing_OSGR int,
Longitude float, Latitude float, Accident_Severity int, Number_of_Vehicles int, Number_of_Casualties int, Date date, 
Day_of_Week int, Time time, "Local_Authority_(District)" int, "Local_Authority_(Highway)" VARCHAR(20), "1st_Road_Class" int,
"1st_Road_Number" int, Road_Type int, Speed_limit int, Junction_Detail int, Junction_Control int, "2nd_Road_Class" int, "2nd_Road_Number" int,
Light_Conditions int, Weather_Conditions int, Road_Surface_Conditions int, Urban_or_Rural_Area int, Casualty_Severity int, Casualty_Type int, Junction_Location int);'''
  
  
cursor.execute(sql)
  
sql2 = '''COPY RoadAccidentsTable(Location_Easting_OSGR, Location_Northing_OSGR, Longitude, Latitude, Accident_Severity,
Number_of_Vehicles, Number_of_Casualties, Date, Day_of_Week, Time, "Local_Authority_(District)", "Local_Authority_(Highway)", "1st_Road_Class",
"1st_Road_Number", Road_Type, Speed_limit, Junction_Detail, Junction_Control, "2nd_Road_Class", "2nd_Road_Number",
Light_Conditions, Weather_Conditions, Road_Surface_Conditions, Urban_or_Rural_Area, Casualty_Severity, Casualty_Type, Junction_Location)
FROM 'D:\\VScode projects\\Updated_dataset2.csv'
DELIMITER ','
CSV HEADER;'''
  
cursor.execute(sql2)
  

  
conn.commit()
conn.close()