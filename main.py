import json
import sqlite3
from playsound import playsound
from flask import Flask, request, current_app, g, jsonify
from flask_restful import Resource, Api

class Test(Resource):
    def get(self):
        playsound('./sound/sound.wav')
        return True

app = Flask(__name__)
api = Api(app)
api.add_resource(Test, '/cardmaker')

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                            'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                            'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    app.run()