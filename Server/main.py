import json
from flask import Flask, request, current_app, g, jsonify
from flask_restful import Resource, Api

from API.DAO import DAO
from API.Mob import Mob


app = Flask(__name__)
api = Api(app)

api.add_resource(DAO, '/DAO/<command>')
api.add_resource(Mob, '/Mob/<command>')


if __name__ == '__main__':
    app.run(port='5002')
