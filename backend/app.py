import cherrypy
import csv

class SaveString(object):
    @cherrypy.expose
    def index(self, line=None):
        with open('leads.csv', 'a') as f:
            writer = csv.writer(f)
            writer.writerow([line])
        return "String saved successfully."

if __name__ == '__main__':
    cherrypy.config.update({'server.socket_port': 8080})
    cherrypy.quickstart(SaveString())
