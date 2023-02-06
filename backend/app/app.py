# app.py
import cherrypy
import pandas as pd

class LeadsAPI:
    @cherrypy.expose
    def index(self, *args, **kwargs):
        leads = pd.read_csv('leads.csv')
        if cherrypy.request.method == 'GET':
            return leads.to_json()
        elif cherrypy.request.method == 'POST':
            data = cherrypy.request.body.read().decode()
            new_lead = pd.read_csv(pd.compat.StringIO(data))
            leads = leads.append(new_lead)
            leads.to_csv('leads.csv', index=False)

if __name__ == '__main__':
    cherrypy.quickstart(LeadsAPI())
