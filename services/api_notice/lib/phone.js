function genFormBody(phones, content) {
  return {
    appId: "TOC", orderNo: new Date().getTime(), protocol: 'S',
    targetCount: phones.length, targetIdenty: phones.join(";"), content: content, isRealTime: 'true'
  }
}

exports.send = function (content) {
  try {
    const msg = JSON.parse(message.value)
    const form = genFormBody(msg.phones, msg.content)

    request.post('http://10.65.209.12:8380/mns-web/services/rest/msgNotify', { form: form }, (err, httpResponse, body) => {
      if (err) { console.error(err) } else { console.info(body) }
    })
  } catch (e) {
    console.error(e);
  }
}

