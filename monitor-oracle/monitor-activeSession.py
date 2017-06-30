import mhttp
import json
import api_es
import api_error
import cx_Oracle
from datetime import datetime

monitorName = "sessionNumber"
monitorSql = "select username, count(*) count from v$session where username is not null group by username"

timestamp = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")

print("start monitor: ", timestamp)

for server in json.loads(mhttp.getServers()):
    print("start:", server["name"])
    try:
        conn = json.loads(mhttp.getServerConnection(server["name"]))
        concUrl = "%s:%s/%s" % (conn["ip"], str(conn["port"]), conn["service"])
        dbConn = cx_Oracle.connect( conn["user"], conn["password"],concUrl)
        dbCr = dbConn.cursor()
        dbCr.execute(monitorSql)
        for username, count in dbCr:
            content = {
                "username": username,
                "count": count,
                "@metric": monitorName,
                "@dbalias": server["name"],
                "@timestamp": timestamp
            }
            api_es.sendElasticsearch("monitor", "oracle", content)
        dbCr.close()
        dbConn.close()
    except Exception as inst:
        api_error.sendError(monitorName, str(inst))
