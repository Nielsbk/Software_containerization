# starting script from https://pythonbasics.org/flask-rest-api/
# sql code from https://www.learnpythonwithrune.org/how-to-setup-a-mysql-server-in-docker-for-your-python-project/

import json
import re
from flask import Flask, make_response, request
import base64
import mysql.connector
import os


app = Flask(__name__)

url_db = mysql.connector.connect(
    host = os.getenv('MYSQL_HOST'),
    user = os.getenv('MYSQL_USER'),
    password = os.getenv('MYSQL_PASSWORD')
)
cur = url_db.cursor()
cur.execute("USE DB")



@app.route('/', methods=['GET', 'POST', 'DELETE'])
def home():    
    # get all pixel coordinates
    if(request.method == 'GET'):
        retrieve_all = f"SELECT coordinate,color FROM pixels"
        cur.execute(retrieve_all)
        response = cur.fetchall()
        data = json.dumps(response)
        print(data)
        return make_response(data, 200)
    
    elif(request.method == 'POST'):
    # post a new pixel coordinate
        try:
            data = request.get_json(force=True)
            print(data)
            x = data['x']
            y = data['y']
            color = data['color']
        except KeyError:
            return make_response('not good', 400)
        
        insert_pixel = f"INSERT INTO pixels (coordinate, color) VALUES ('{x},{y}', '{color}')"
        cur.execute(insert_pixel)
        cur.execute("COMMIT")
        return make_response("Coordinate added", 201)


    return make_response('not found', 404)
