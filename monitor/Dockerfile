FROM node:8.1.2

RUN npm i -g typescript

RUN mkdir /opt/cmsfs
WORKDIR /opt/cmsfs

ADD package.json .

RUN npm i

ADD api-config.ts .
ADD api-connect.ts .
ADD api-error.ts .
ADD api-es.ts .
ADD execute-command.ts .

RUN tsc

ADD index.js index.js

CMD node lib/monitor-memoryUsage.js