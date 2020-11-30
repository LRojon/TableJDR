import json
from flask import Flask, request, current_app, g, jsonify
from flask_restful import Resource, Api

from API.DAO import DAO
from API.Mob import Mob
from API.Ambiance import Ambiance
from API.Character import Character
from API.Map import Map
from API.Folder import Tree


app = Flask(__name__)
api = Api(app)

api.add_resource(DAO, '/DAO/<command>')
api.add_resource(Mob, '/Mob/<command>')
api.add_resource(Ambiance, '/Ambiance/<command>')
api.add_resource(Character, '/Character/<command>')
api.add_resource(Map, '/Map/<command>')
api.add_resource(Tree, '/Tree/<command>')


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET,PUT,POST,DELETE,OPTIONS')
    return response


if __name__ == '__main__':
    app.run(port='5002')
