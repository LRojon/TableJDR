import sqlite3

class DAO_Object:

    def __init__(self, profilSend):
        self.conn = sqlite3.connect("./db/"+ profilSend + ".db", check_same_thread=False)
        self.cur = self.conn.cursor()
        try:
            self.cur.execute('''SELECT count(name) FROM Folder''')
        except sqlite3.OperationalError as err:
            self.create()
    
    def create(self):
        req = "CREATE TABLE Folder(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, type TEXT NOT NULL, parent INTEGER)" 
        self.cur.execute(req)
        req = "CREATE TABLE Character(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, pv INTEGER NOT NULL, ac INTEGER NOT NULL, perception INTEGER NOT NULL, for INTGER NOT NULL, dex INTEGER NOT NULL, con INTEGER NOT NULL, int INTEGER NOT NULL, sag INTEGER NOT NULL, cha INTEGER NOT NULL, speed INTEGER NOT NULL, parent INTEGER)" 
        self.cur.execute(req)
        req = "CREATE TABLE Mob(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, token TEXT NOT NULL, pv INTEGER NOT NULL, xp INTEGER NOT NULL, for INTGER NOT NULL, dex INTEGER NOT NULL, con INTEGER NOT NULL, int INTEGER NOT NULL, sag INTEGER NOT NULL, cha INTEGER NOT NULL, danger TEXT NOT NULL, sense TEXT NOT NULL, save TEXT NOT NULL, speed TEXT NOT NULL, ac INTEGER NOT NULL, ac_type TEXT NOT NULL, skill TEXT NOT NULL, action TEXT NOT NULL, capacite TEXT NOT NULL, parent INTEGER)" 
        self.cur.execute(req)
        req = "CREATE TABLE Map(id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT NOT NULL,  ambiance_id INTEGER NOT NULL, parent INTEGER)" 
        self.cur.execute(req)
        req = "CREATE TABLE Ambiance(id INTEGER PRIMARY KEY AUTOINCREMENT, music TEXT NOT NULL,  mode TEXT NOT NULL, color TEXT NOT NULL)" 
        self.cur.execute(req)
        self.conn.commit()

    def changeDB(self,profilSend):
        self.conn = sqlite3.connect("./db/"+ profilSend + ".db", check_same_thread=False)
        self.cur = self.conn.cursor()

    def close(self):
        self.conn.close()

    def execute(self,req):
        self.cur.execute(req)
        self.conn.commit()

    def select(self,req):
        self.cur.execute(req)
        return self.cur.fetchall()

global dao
dao = DAO_Object("initDB")