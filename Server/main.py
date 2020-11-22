import json
from flask import Flask, request, current_app, g, jsonify
from flask_restful import Resource, Api

from API.DAO import DAO
from API.Mob import Mob
from API.Ambiance import Ambiance
from API.Character import Character
from API.Map import Map


app = Flask(__name__)
api = Api(app)

api.add_resource(DAO, '/DAO/<command>')
api.add_resource(Mob, '/Mob/<command>')
api.add_resource(Ambiance, '/Ambiance/<command>')
api.add_resource(Character, '/Character/<command>')
api.add_resource(Map, '/Map/<command>')


if __name__ == '__main__':
    app.run(port='5002')
