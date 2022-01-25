# filter(weather = rain) = 1000
# { "lat long: 1", "x y" : 0.1, "z k": 0.6 }
# { "lat long" : 0 - 1 } 
from flask import Flask, jsonify, request, g, current_app
import pandas as pd
from src.utils import calculate_heatmap
from src.models.accident import RoadAccident
from peewee import *


app = Flask(
    __name__,
    static_folder = "/static",
    static_url_path = "/static"
)
# TEMPORARY, TODO: Substitude with actual database
# db = pd.read_csv('dataset.csv')
db = PostgresqlDatabase('postgres', **{'user': 'postgres', 'password': 'postgres', 'host' : '172.20.0.2'})
db.connect()

data = RoadAccident.select()

@app.route("/heatmap", methods=['GET'])
def get_data():
    return calculate_heatmap(data[0:100]);

if __name__ == '__main__':
    app.run(port=4242, host='0.0.0.0', debug=True)