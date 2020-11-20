from flask import Flask, request, current_app, g, jsonify
from flask_restful import Resource

from utils.DAO_Object import dao


class DAO(Resource):
    def post(self, command):
        print(command)
        if command == "create":
            dao.__init__(request.json['profil'])
            return {"code":200}
        elif command == "changeDB":
            dao.changeDB(request.json['profil'])
            return {"code":200}
        elif command == "getall":
            result = {}
            tables = ["Folder", "Character", "Map", "Mob", "Ambiance"]
            for t in tables :
                result[t] = dao.select("SELECT * FROM " + t)
            return {"code":200, "data" : result}
        return {"code": "404"}
