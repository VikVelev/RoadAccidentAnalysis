import pandas as pd
from src.utils import local_authority_district


def __convert_to_geojson__(heatmap, before_lod, additional_data): # before_lod => before level of detail computation
    geojson = {}
    geojson["type"] = "FeatureCollection"
    features = []
    i = 0

    for key in heatmap:
        latitude, longtitude = key.split(";")
        latitude, longtitude = float(latitude), float(longtitude)

        features.append({
            "type" : "Feature",
            "properties" : {
                "id": i,
                "intensity": heatmap[key],
                "number_of_accidents" : before_lod[key],
                **additional_data[key]
            },
            "geometry" : {
                "type": "Point",
                "coordinates": [ longtitude, latitude ]
            }
        })
        i += 1

    geojson["features"] = features
    print("after aggregation: " + str(len(features)))
    return geojson

'''
    Accepts a list of accidents (src.models.accident.Accident)
    calculates a number of intensity between 0 and 1
    returns a map of coordinates and as a value the intensity
'''
def calculate_heatmap(accidents: list, detail=3):

    heatmap = {}
    additional_data = {} # Additional aggregated data
    
    if len(accidents) < 1: return __convert_to_geojson__(heatmap, heatmap, additional_data)

    for a in accidents:
        try:
            latitude = round(float(a.latitude), detail)
            longtitude = round(float(a.longitude), detail)
            key = str(latitude) + ";" + str(longtitude)
            heatmap[key] = heatmap.get(key, 0) + 1
            additional_data[key] = {
                "number_of_vehicles" : additional_data.get(key, {}).get("number_of_vehicles", 0) + a.number_of_vehicles,
                "number_of_casualties": additional_data.get(key, {}).get("number_of_casualties", 0) + a.number_of_casualties,
                "local_authority": local_authority_district[a.local_authority___district_],
                "most_recent_accident_date" : a.date
            }
        except:
            pass

    # Save the instance of heatmap before performing calculations on it
    before_lod = heatmap.copy()
    
    # normalize between 0 and 1
    min_value = min(heatmap.values())
    max_value = max(heatmap.values())

    for key in heatmap:
        x = heatmap[key]
        if (max_value - min_value == 0):
            heatmap[key] = 0
        else:
            heatmap[key] = round((x - min_value) / (max_value - min_value), 4)

    return __convert_to_geojson__(heatmap, before_lod, additional_data)