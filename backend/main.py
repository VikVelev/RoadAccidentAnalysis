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


@app.route("/correlation", methods=['POST'])
def get_correlation_coefficient():
    # Correlation Coefficients computed with this approach: https://stackoverflow.com/questions/54713342/correlation-coefficient-for-three-variables-in-r
    # Code can be found in folder backend/computations implemented by us in python instead of R
    corr_coeff = [
        (['Light_Conditions', 'Number_of_Casualties'], -0.0227020712209112),
        (['Day_of_Week', 'Number_of_Casualties'], 0.07510132850557351),
        (['Urban_or_Rural_Area', 'Number_of_Casualties'], 0.14505478503862343),
        (['Road_Surface_Conditions', 'Number_of_Casualties'], 0.06087821007684398),
        (['Weather_Conditions', 'Number_of_Casualties'], 0.1564391784384032),
        (['Number_of_Casualties', 'Number_of_Casualties'], 1.0),
        (['Light_Conditions', 'Day_of_Week', 'Number_of_Casualties'],
        0.07869573082590976),
        (['Light_Conditions', 'Urban_or_Rural_Area', 'Number_of_Casualties'],
        0.15309670960320665),
        (['Light_Conditions', 'Road_Surface_Conditions', 'Number_of_Casualties'],
        0.20494448815357283),
        (['Light_Conditions', 'Weather_Conditions', 'Number_of_Casualties'],
        0.19772091370957579),
        (['Day_of_Week', 'Urban_or_Rural_Area', 'Number_of_Casualties'],
        0.16340576240688084),
        (['Day_of_Week', 'Road_Surface_Conditions', 'Number_of_Casualties'],
        0.0990416091148348),
        (['Day_of_Week', 'Weather_Conditions', 'Number_of_Casualties'],
        0.1731660045330893),
        (['Urban_or_Rural_Area', 'Road_Surface_Conditions', 'Number_of_Casualties'],
        0.18363100055916753),
        (['Urban_or_Rural_Area', 'Weather_Conditions', 'Number_of_Casualties'],
        0.21217649660756285),
        (['Road_Surface_Conditions', 'Weather_Conditions', 'Number_of_Casualties'],
        0.32058613166134364),
        (['Light_Conditions',
        'Day_of_Week',
        'Urban_or_Rural_Area',
        'Number_of_Casualties'],
        0.1698126106577139),
        (['Light_Conditions',
        'Day_of_Week',
        'Road_Surface_Conditions',
        'Number_of_Casualties'],
        0.21779377241343206),
        (['Light_Conditions',
        'Day_of_Week',
        'Weather_Conditions',
        'Number_of_Casualties'],
        0.2097797378745186),
        (['Light_Conditions',
        'Urban_or_Rural_Area',
        'Road_Surface_Conditions',
        'Number_of_Casualties'],
        0.2737461852839604),
        (['Light_Conditions',
        'Urban_or_Rural_Area',
        'Weather_Conditions',
        'Number_of_Casualties'],
        0.24833315424843164),
        (['Light_Conditions',
        'Road_Surface_Conditions',
        'Weather_Conditions',
        'Number_of_Casualties'],
        0.3990161707015006),
        (['Day_of_Week',
        'Urban_or_Rural_Area',
        'Road_Surface_Conditions',
        'Number_of_Casualties'],
        0.20371829789616774),
        (['Day_of_Week',
        'Urban_or_Rural_Area',
        'Weather_Conditions',
        'Number_of_Casualties'],
        0.22795195520875539),
        (['Day_of_Week',
        'Road_Surface_Conditions',
        'Weather_Conditions',
        'Number_of_Casualties'],
        0.33790098581921185),
        (['Urban_or_Rural_Area',
        'Road_Surface_Conditions',
        'Weather_Conditions',
        'Number_of_Casualties'],
        0.3751621040562009),
        (['Light_Conditions',
        'Day_of_Week',
        'Urban_or_Rural_Area',
        'Road_Surface_Conditions',
        'Number_of_Casualties'],
        0.28443418404778864),
        (['Light_Conditions',
        'Day_of_Week',
        'Urban_or_Rural_Area',
        'Weather_Conditions',
        'Number_of_Casualties'],
        0.25962037395620785),
        (['Light_Conditions',
        'Day_of_Week',
        'Road_Surface_Conditions',
        'Weather_Conditions',
        'Number_of_Casualties'],
        0.4065063965084482),
        (['Light_Conditions',
        'Urban_or_Rural_Area',
        'Road_Surface_Conditions',
        'Weather_Conditions',
        'Number_of_Casualties'],
        0.4397898481464499),
        (['Day_of_Week',
        'Urban_or_Rural_Area',
        'Road_Surface_Conditions',
        'Weather_Conditions',
        'Number_of_Casualties'],
        0.38309828522017114),
        (['Light_Conditions',
        'Day_of_Week',
        'Urban_or_Rural_Area',
        'Road_Surface_Conditions',
        'Weather_Conditions',
        'Number_of_Casualties'],
        0.44660069540206215)]

    columns = request.json["columns"]
    columns.append('Number_of_Casualties')

    for (k, v) in corr_coeff:
        if all(elem in k for elem in columns):
            return jsonify({ "correlation": v });

    return jsonify({ "correlation" : 0 });

if __name__ == '__main__':
    app.run(port=4242, host='0.0.0.0', debug=True)