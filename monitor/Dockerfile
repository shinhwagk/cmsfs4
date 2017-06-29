FROM node:8.1.2

ARG monitor

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

CMD node lib/main.js

ADD monitor-${monitor}.ts main.ts

RUN tsc