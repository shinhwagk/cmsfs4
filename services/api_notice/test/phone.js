const phone = require("../lib/phone")
const content = { phones: ["13917926210"], content: "hahahah" }
phone.send(content).then(function (response) {
  console.log(response);
})