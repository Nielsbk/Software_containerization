# !/usr/bin/env python3 
# starting script from https://pythonbasics.org/flask-rest-api/
# sql code from https://www.learnpythonwithrune.org/how-to-setup-a-mysql-server-in-docker-for-your-python-project/

import json
from flask import Flask, make_response, request
import mysql.connector
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
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
            return make_response('could not process request body', 400)
        # check if coordinate already exists
        check_coordinate = f"SELECT * FROM pixels WHERE coordinate = '{x},{y}'"
        cur.execute(check_coordinate)
        response = cur.fetchall()
        if response:
            # if coordinate exists, update color
            update_pixel = f"UPDATE pixels SET color = '{color}' WHERE coordinate = '{x},{y}'"
            cur.execute(update_pixel)
            cur.execute("COMMIT")
            return make_response("Coordinate updated", 201)
        else:
            insert_pixel = f"INSERT INTO pixels (coordinate, color) VALUES ('{x},{y}', '{color}')"
            cur.execute(insert_pixel)
            cur.execute("COMMIT")
            return make_response("Coordinate added", 201)


    return make_response('not found', 404)
