import json
from flask import Flask, request, current_app, g, jsonify, Response
from flask_restful import Resource

from utils.DAO_Object import dao


class Mob(Resource):
    def post(self, command):
        if command == "setbyid":
            att = []
            values = []
            data = request.json['data']
            id = data["id"]
            if id == -1:
                data.pop("id")
                for i in data.keys():
                    att.append(i)
                    values.append(data[i])
                if not("parent" in data.keys()):
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
            else:
                for i in data.keys():
                    att.append(i)
                    values.append(data[i])
                if not("parent" in data.keys()):
                    att.append("parent")
                    values.append(1)
                str_att = ""
                for i in range(len(att)):
                    str_att = str_att + str(att[i]) + "=?,"
                str_att = str_att[:-1]
                req = "UPDATE Mob SET " + str_att + " WHERE id="+str(id)+";"
                dao.execute(req, values)
            return {"code": 200}
        elif command == "getonebyid":
            rows = dao.select(
                "SELECT * FROM Mob WHERE id=(?);", [request.json["id"]])
            if rows:
                mobs = []
                for row in rows:
                    mobs.append(MobData(row[0], row[1], row[2], row[3], row[4],
                                        row[5], row[6], row[7], row[8], row[9],
                                        row[10], row[11], row[12], row[13],
                                        row[14], row[15], row[16], row[17],
                                        row[18], row[19]).getJSON())
                # return {"code": 200, "data": mobs[0]}
                return Response(
                    response=json.dumps(mobs[0]), status=200, mimetype="application/json")
            else:
                # return {"code": 404, "message": "The mob with id '" + str(request.json["id"]) + "' doesn't exist."}
                return Response(response="The mob with id '" + str(request.json["id"]) + "' doesn't exist.",
                                status=404)
        elif command == "getall":
            rows = dao.select("SELECT * FROM Mob")
            ret = []
            for row in rows:
                ret.append(MobData(row[0], row[1], row[2], row[3], row[4],
                                   row[5], row[6], row[7], row[8], row[9],
                                   row[10], row[11], row[12], row[13],
                                   row[14], row[15], row[16], row[17],
                                   row[18], row[19]).getJSON())
            return {"code": 200, "data": ret}
        elif command == "delete":
            dao.execute("DELETE FROM Mob WHERE id=(?);", [request.json["id"]])
            return {"code": 200}
        return {"code": "404"}


class MobData:
    def __init__(self, id, name, token, pv, xp, str, dex, con, int, sag, cha, danger, sense, save, speed, ac, type_ac, skill, action, capacities):
        self.id = id
        self.name = name
        self.token = token
        self.pv = pv
        self.xp = xp
        self.str = str
        self.dex = dex
        self.con = con
        self.int = int
        self.sag = sag
        self.cha = cha
        self.danger = danger
        self.sense = sense
        self.save = save
        self.speed = speed
        self.ac = ac
        self.type_ac = type_ac
        self.skill = skill
        self.action = action
        self.capacities = capacities

    def getJSON(self):
        return {
            "id": self.id,
            "name": self.name,
            "token": self.token,
            "pv": self.pv,
            "xp": self.xp,
            "for": self.str,
            "dex": self.dex,
            "con": self.con,
            "int": self.int,
            "sag": self.sag,
            "cha": self.cha,
            "danger": self.danger,
            "sense": self.sense,
            "save": self.save,
            "speed": self.speed,
            "ac": self.ac,
            "type_ac": self.type_ac,
            "skill": self.skill,
            "action": self.action,
            "capacities": self.capacities
        }
