from flask import Flask, request, current_app, g, jsonify
from flask_restful import Resource

from utils.DAO_Object import dao


class Tree(Resource):
    def post(self, command):
        # request.get_json(force=True)
        if command == "getTree":
            type = request.json['type']
            if type == "Mob" or type == "Character" or type == "Map":
                tmp = []
                rows = dao.select(
                    "SELECT * from Folder where type=? and parent IS NULL", (type,))
                for row in rows:
                    tmp.append(Folder(
                        row[0],
                        row[1]
                    ))
                tmp = Arbo(tmp, type)
                ret = []
                for elem in tmp:
                    ret.append(elem.getJSON())
                return {"code": 200, "data": ret}
            else:
                return {"code": 400, "message": "Bad Request: This type doesn't exist"}


class Folder:
    def __init__(self, id, name, items=None):
        self.id = id
        self.value = name
        self.items = items

    def getJSON(self):
        items = []
        for item in self.items:
            items.append(item.getJSON())
        return {
            'id': self.id,
            'value': self.value,
            'items': items
        }


class Item:
    def __init__(self, id, name):
        self.id = id
        self.value = name

    def getJSON(self):
        return {
            'id': self.id,
            'value': self.value
        }


def Arbo(folders, type):
    for folder in folders:
        folds = []
        rows = dao.select("SELECT * FROM Folder WHERE parent=?", (folder.id,))
        for row in rows:
            folds.append(Folder(
                row[0],
                row[1],
            ))
        folder.items = Arbo(folds, type)
        rows = dao.select("SELECT * FROM " + type +
                          " WHERE parent=?", (folder.id,))
        for row in rows:
            folder.items.append(Item(
                row[0],
                row[1],
            ))
    print(affArbo(folders))
    return folders


def affArbo(folders, n=0):
    ret = ""
    for folder in folders:
        ret += folder.value
        if hasattr(folder, 'items'):
            for items in folder.items:
                ret += "\n+-" + items.value
                if hasattr(items, 'items'):
                    for item in items.items:
                        ret += "\n  +-" + item.value
    return ret
