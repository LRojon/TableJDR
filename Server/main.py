import json
from flask import Flask, request, current_app, g, jsonify
from flask_restful import Resource, Api

from API.DAO import DAO


app = Flask(__name__)
api = Api(app)

api.add_resource(DAO, '/DAO/<command>')


if __name__ == '__main__':
    app.run(port='5002')
