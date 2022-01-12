import pandas as pd

def __convert_to_geojson__(heatmap, prev):
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
                "number" : prev[key]
            },
            "geometry" : {
                "type": "Point",
                "coordinates": [ longtitude, latitude ]
            }
        })
        i += 1

    geojson["features"] = features
    return geojson

'''
Accepts a list of accidents (src.models.accident.Accident)
calculates a number of intensity between 0 and 1
returns a map of coordinates and as a value the intensity
'''
def calculate_heatmap(accidents: list, detail=3):
    heatmap = {}

    for a in accidents:
        try:
            latitude = round(float(a.lat), detail)
            longtitude = round(float(a.long), detail)
            key = str(latitude) + ";" + str(longtitude)
            heatmap[key] = heatmap.get(key, 0) + 1
        except:
            pass

    # normalize between 0 and 1
    min_value = min(heatmap.values())
    max_value = max(heatmap.values())

    prev = heatmap.copy()

    for key in heatmap:
        x = heatmap[key]
        if (max_value - min_value == 0):
            heatmap[key] = 0
        else:
            heatmap[key] = round((x - min_value) / (max_value - min_value), 4)

    return __convert_to_geojson__(heatmap, prev)