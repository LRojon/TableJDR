from flask import Flask, request, current_app, g, jsonify
from flask_restful import Resource

from utils.DAO_Object import dao


class Mob(Resource):
    def post(self, command):
        if command == "setbyid":
            att = []
            values = []
            data = request.json['data']
            for i in data.keys():
                att.append(i)
                values.append(data[i])
            att.append("parent")
            values.append(1)
            str_att = ""
            str_values = ""
            for i in range(len(att)):
                str_att = str_att + str(att[i]) + ","
                str_values = str_values + "?,"
            str_att = str_att[:-1]
            str_values = str_values[:-1]
            req = "INSERT INTO Mob (" + str_att + \
                ") VALUES(" + str_values + ");"
            dao.execute(req, values)
            return {"code": 200}
        elif command == "getonebyid":
            result = dao.select(
                "SELECT * FROM Mob WHERE id=(?);", [request.json["id"]])
            return {"code": 200, "data": result}
        elif command == "getall":
            result = dao.select("SELECT * FROM Mob")
            return {"code": 200, "data": result}
        elif command == "delete":
            dao.execute("DELETE FROM Mob WHERE id=(?);", [request.json["id"]])
            return {"code": 200}
        return {"code": "404"}
