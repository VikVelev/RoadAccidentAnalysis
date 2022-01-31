from peewee import *

db_ip = '172.18.0.3'

database = PostgresqlDatabase('postgres', **{'user': 'postgres', 'password': 'postgres', 'host' : db_ip})

class UnknownField(object):
    def __init__(self, *_, **__): pass

class BaseModel(Model):
    class Meta:
        database = database

class RoadAccident(BaseModel):
    _1st_road_class = IntegerField(column_name='1st_Road_Class', null=True)
    _1st_road_number = IntegerField(column_name='1st_Road_Number', null=True)
    _2nd_road_class = IntegerField(column_name='2nd_Road_Class', null=True)
    _2nd_road_number = IntegerField(column_name='2nd_Road_Number', null=True)
    local_authority___district_ = IntegerField(column_name='Local_Authority_(District)', null=True)
    local_authority___highway_ = CharField(column_name='Local_Authority_(Highway)', null=True)
    accident_severity = IntegerField(null=True)
    casualty_severity = IntegerField(null=True)
    casualty_type = IntegerField(null=True)
    date = DateField(null=True)
    day_of_week = IntegerField(null=True)
    junction_control = IntegerField(null=True)
    junction_detail = IntegerField(null=True)
    junction_location = IntegerField(null=True)
    latitude = DoubleField(null=True)
    light_conditions = IntegerField(null=True)
    location_easting_osgr = IntegerField(null=True)
    location_northing_osgr = IntegerField(null=True)
    longitude = DoubleField(null=True)
    number_of_casualties = IntegerField(null=True)
    number_of_vehicles = IntegerField(null=True)
    road_surface_conditions = IntegerField(null=True)
    road_type = IntegerField(null=True)
    speed_limit = IntegerField(null=True)
    time = TimeField(null=True)
    urban_or_rural_area = IntegerField(null=True)
    weather_conditions = IntegerField(null=True)

    class Meta:
        table_name = 'road_accidents_table'
        primary_key = False

