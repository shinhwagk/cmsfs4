const axios = require("axios")
const querystring = require('querystring');

function genFormBody(phones, content) {
  return {
    appId: "TOC", orderNo: new Date().getTime(), protocol: 'S',
    targetCount: phones.length, targetIdenty: phones.join(";"), content: content, isRealTime: 'true'
  }
}

exports.send = function (content) {
  console.info(`receive phone send request, target: ${content.phones}`)
  const form = genFormBody(content.phones, content.content)
  return axios.post('http://10.65.209.12:8380/mns-web/services/rest/msgNotify', querystring.stringify(form));
}