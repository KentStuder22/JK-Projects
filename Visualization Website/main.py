from genericpath import exists
import tornado
import tornado.ioloop
import tornado.web
import pymongo
import os.path
import json
import bson
import pprint

client = pymongo.MongoClient("mongodb://james:IYT7i6rfTR&%25R*&@119.45.163.114:27017/TweetScraper")
#client = pymongo.MongoClient("mongodb://kent:viygF&$^&VFJF@119.45.163.114:27017/TweetScraper")
db = client['TweetScraper']
collection = db['tweetday']

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        
        tweets = []
        stop_at = 10_000
        
        for tweet in collection.find( { 
                "is_labeled" : 1, 
                # {"label_result" : "true"}, 
                # "geo" : {'$ne' : "N/A"}
                } ):
            temp = [tweet['geo'], tweet['created_at'], tweet['label_result']]
            tweets.append(json.dumps(temp))
            
            if len(tweets) == stop_at: break

        self.render("templates/index.html", tweets=tornado.escape.json_encode(tweets))    

class TrendHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello Worlds")

def setup_app():

    settings = {
        "static_path": os.path.join(os.path.dirname(__file__), "static")
    }
    handlers = [
        (r'/', MainHandler),
        (r"/trends", TrendHandler),
    ]
    return tornado.web.Application(
        handlers=handlers,
        **settings,
        db = db
    )

if __name__ == '__main__':
    application = setup_app()
    application.listen(8888)
    print("The server is listening on port {8888}\n")
    tornado.ioloop.IOLoop.current().start()
