import http.client
import json

def httpGetClient(hostname,port,url):
  conn = http.client.HTTPConnection(hostname,port)
  conn.request("GET", url)
  data = conn.getresponse().read().decode('utf-8')
  conn.close()
  return data

def getServers():
  try:
    return httpGetClient("config.cmsfs.org", 3000, "/v1/monitor/sessionNumber/server")
  except:
    return '[]'

def getServerConnection(server):
  return httpGetClient("connect.cmsfs.org", 3000, "/v1/connect/jdbc/oracle/%s" % (server))