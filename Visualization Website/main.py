import tornado
import tornado.ioloop
import tornado.web
import pymongo
import datetime
import os.path
import json
import bson
import pprint

client = pymongo.MongoClient("mongodb://james:IYT7i6rfTR&%25R*&@119.45.163.114:27017/TweetScraper")

db = client['TweetScraper']
collection = db['tweetday']

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        
        tweets = []
        stop_at = 40_000

        for tweet in collection.find():
            if not tweet['is_labeled']: # only get labeled data
                continue
            tweets.append(json.dumps(tweet))
            if len(tweets) == stop_at: break

        self.render("index.html", tweets=tornado.escape.json_encode(tweets))    


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/", MainHandler),
            # (r"/", DataHandler),
        ]

        settings = {
            "debug": True,
            "static_path": os.path.join(os.path.dirname(__file__), "static")
        }
        tornado.web.Application.__init__(self, handlers, **settings)

if __name__ == '__main__':
    application = Application()
    application.listen(8888)
    tornado.ioloop.IOLoop.current().start()
