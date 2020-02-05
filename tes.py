#!/usr/bin/python3

import pymysql
import cherrypy
import json
import datetime
import sys
import logging


class _JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.date):
            return obj.isoformat()
        return super().default(obj)

    def iterencode(self, value):
        for chunk in super().iterencode(value):
            yield chunk.encode("utf-8")


json_encoder = _JSONEncoder()


def json_handler(*args, **kwargs):
    value = cherrypy.serving.request._json_inner_handler(*args, **kwargs)
    return json_encoder.iterencode(value)


class Test(object):

    def myconn(self):
        host = cherrypy.request.app.config['mydb']['host']
        user = cherrypy.request.app.config['mydb']['user']
        passwd = cherrypy.request.app.config['mydb']['passwd']
        database = cherrypy.request.app.config['mydb']['database']

        return pymysql.connect(host, user, passwd, database,
                               cursorclass=pymysql.cursors.DictCursor)

    @cherrypy.expose
    def index(self):
        return("its works \n")

    @cherrypy.expose
    @cherrypy.tools.json_out(handler=json_handler)
    @cherrypy.tools.gzip(on=True)
    @cherrypy.tools.gzip(mime_types=['text/*', 'application/*'])
    def data(self, tgl="ALL"):
        try:
            ssql = cherrypy.request.app.config["sqlscript"]["sql01"]
            if (tgl != "ALL"):
                ssql = cherrypy.request.app.config["sqlscript"]["sql02"] + \
                    "trndate='%s'" % tgl

            conn = self.myconn()
            cur = conn.cursor()
            logging.warning(ssql)
            cur.execute(ssql)
            json_data = []
            hasil = cur.fetchall()
            for isi in hasil:
                json_data.append(isi)
            cherrypy.response.headers["Access-Control-Allow-Origin"] = "*"
            if not json_data:
                json_data.append({"status": "204", "data": "empty",
                                  "trndate": tgl,  "server": "cherrypy 18.5 on python3"})
            return json_data
        except:
            return {"status": "error 500"}

    @cherrypy.expose
    @cherrypy.tools.json_out(handler=json_handler)
    @cherrypy.tools.gzip(on=True)
    @cherrypy.tools.gzip(mime_types=['text/*', 'application/*'])
    def list(self):
        conn = self.myconn()
        cur = conn.cursor()
        cur.execute("show full processlist;")
        json_data = []
        hasil = cur.fetchall()
        for isi in hasil:
            json_data.append(isi)
        cherrypy.response.headers["Access-Control-Allow-Origin"] = "*"
        return json_data


cherrypy.server.socket_host = '0.0.0.0'
if __name__ == "__main__":
    cherrypy.quickstart(Test(), "/", "app.conf")
