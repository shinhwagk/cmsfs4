import json
import http.client

def sendError(monitor, content):
    headers = {"Content-type": "application/json; charset=utf-8"}
    conn = http.client.HTTPConnection("notice.cmsfs.org", 3000)
    url = "/v1/notice/phone"
    content = json.dumps({"phones": ["13917926210"],"content":"montior: %s, error: %s" % (monitor,content)})
    conn.request("POST", url, content, headers)
    response = conn.getresponse()
    print(response.status, response.reason)
    conn.close()