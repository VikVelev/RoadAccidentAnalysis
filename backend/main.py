# filter(weather = rain) = 1000
# { "lat long: 1", "x y" : 0.1, "z k": 0.6 }
# { "lat long" : 0 - 1 } 
from flask import Flask, jsonify, request
import pandas as pd
from src.heatmap import calculate_heatmap
from src.filtering import filter_accidents
from src.models.accident import RoadAccident
from flask_cors import CORS
from peewee import *

app = Flask(__name__, static_folder = "/static", static_url_path = "/static")
CORS(app)

db_ip = '172.18.0.2'
# TEMPORARY, TODO: Substitude with actual database
# db = pd.read_csv('dataset.csv')
db = PostgresqlDatabase('postgres', **{'user': 'postgres', 'password': 'postgres', 'host' : db_ip })
db.connect()

'''
    Returns a heatmap based on the filters specified
    - no filter = all results
    - filter is a json format as follows "key" : [possible value 1, possible value 2]
    
    A list of all possible values:
    {
        "detail" : positive number
        "light_conditions" : ( 1 | 4 | 5 | 6 | 7 | -1 (missing)),
        "weather_conditions": ( 1 to 8 | 9 (unknown) | -1 (missing)),
        "road_surface_conditions": ( 1 to 7 | 9 (unkown) | -1 (missing)),
        "special_conditions" : ( 0 to 7 | 9 (unknown) | -1 (missing)),
        "urbal_or_rural_area" : ( 1 | 2 | 3 | -1 (missing)),
        "day_of_week" : ( 1 - Sunday to 7 - Saturday),
        "date" : {
            "start_date" : some date, (optional)
            "end_date" : some date,   (optional)
        }
    }
'''
@app.route("/heatmap", methods=['POST'])
def get_data():
    # Validation
    
    filter_conditions = request.json
    
    detail_level = None

    if "detail" in filter_conditions:
        detail_level = filter_conditions["detail"]
    
    if detail_level is None or detail_level < 0:
        detail_level = 3

    data = filter_accidents(filter_conditions)
    
    response = jsonify(calculate_heatmap(data, detail=detail_level));
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response;

if __name__ == '__main__':
    app.run(port=4242, host='0.0.0.0', debug=True)