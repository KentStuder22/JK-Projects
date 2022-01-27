import os.path
import tornado.ioloop
import tornado.web
import tornado.escape
from pymongo.mongo_client import MongoClient
from os import path
from posixpath import dirname
from bson import ObjectId

cluster = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
client = MongoClient(cluster)
db = client.web_demo

class MainHandler(tornado.web.RequestHandler):
    async def get(self):

        collection = db.states
        stateNames = []
        stateABV = []
        statePops = []
        for  state in collection.find():
            state['_id'] = str(state['_id'])
            state['Name'] = str(state['Name'])
            state['ABV'] = str(state['ABV'])
            state['Population'] = str(state['Population'])
            stateNames.append(state['Name'])
            stateABV.append(state['ABV'])
            statePops.append(state['Population'])
        
        self.render("templates/index.html", sNames = stateNames, sABV = stateABV, sPops = statePops)

def setup_app():

    settings = {
        "static_path": os.path.join(os.path.dirname(__file__), "static")
    }
    handlers = [
        (r'/', MainHandler),
    ]
    return tornado.web.Application(
        handlers=handlers,
        **settings,
        db = db
    )

if __name__=="__main__":
    app = setup_app()
    app.listen(8000)
    print("Server is listening on localhost on port {8000}")
    tornado.ioloop.IOLoop.current().start()