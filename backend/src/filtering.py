from distutils.command.build import build
from src.models.accident import RoadAccident
from peewee import *

from dateutil.parser import parse


def build_or_query(db_property, possible_properties):

    if possible_properties is not None and isinstance(possible_properties, list):
        
        if (len(possible_properties) == 0): return (db_property.is_null(False))

        condition = (db_property == possible_properties[0])
        
        if len(possible_properties) > 1:
            possible_properties.pop(0)

            for num in possible_properties:
                condition |= (db_property == num);
        
    return condition


'''
A list of all possible values:
    {
        "light_conditions" : ( 1 | 4 | 5 | 6 | 7 | -1 (missing)),      # DONE
        "weather_conditions": ( 1 to 8 | 9 (unknown) | -1 (missing)), 
        "road_surface_conditions": ( 1 to 7 | 9 (unkown) | -1 (missing)),
        "urbal_or_rural_area" : ( 1 | 2 | 3 | -1 (missing)),
        "junction_location" : TODO
        "day_of_week" : ( 1 - Sunday to 7 - Saturday),
        "date" : {
            "start_date" : some date, (optional)
            "end_date" : some date,   (optional)
        }
    }
'''
def filter_accidents(args):
    if (args == None): return RoadAccident.select()
    
    final_condition = True
    
    if "light_conditions" in args:
        final_condition &= build_or_query(RoadAccident.light_conditions, args["light_conditions"])

    if "weather_conditions" in args:
        final_condition &= build_or_query(RoadAccident.weather_conditions, args["weather_conditions"])

    if "road_surface_conditions" in args:
        final_condition &= build_or_query(RoadAccident.road_surface_conditions, args["road_surface_conditions"])
    
    if "urban_or_rural_area" in args:
        final_condition &= build_or_query(RoadAccident.urban_or_rural_area, args["urban_or_rural_area"])

    if "day_of_week" in args:
        final_condition &= build_or_query(RoadAccident.day_of_week, args["day_of_week"])

    if "date" in args:
        date = args["date"]
        date_condition = True
        
        if "start" in date:
            start_date = parse(date["start"])
            date_condition &= (RoadAccident.date > start_date)
            
        if "end" in date:
            end_date = parse(date["end"])
            date_condition &= (RoadAccident.date < end_date)

        final_condition &= date_condition

    res = RoadAccident.select().where(final_condition)

    return res