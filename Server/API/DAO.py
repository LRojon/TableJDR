import subprocess
from flask import Flask, request, current_app, g, jsonify
from flask_restful import Resource

from utils.DAO_Object import dao


class DAO(Resource):
    def post(self, command):
        request.get_json(force=True)
        if command == "create":
            dao.__init__(request.json['profil'])
            return {"code": 200}
        elif command == "changeDB":
            dao.changeDB(request.json['profil'])
            return {"code": 200}
        elif command == "getAllData":
            result = {}
            tables = ["Folder", "Character", "Map", "Mob", "Ambiance"]
            for t in tables:
                result[t] = dao.select("SELECT * FROM " + t)
            return {"code": 200, "data": result}
        elif command == "getAllProfil":
            profileStr = subprocess.check_output("ls ./db", shell=True)
            profileStr = profileStr.decode("utf-8")
            profileStr = profileStr[10:]
            result = profileStr.replace(".db", "").split('\n')
            result.pop()
            return {"code": 200, "data": result}
        return {"code": "404"}
