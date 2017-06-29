FROM node:8

RUN mkdir /opt/cmsfs

WORKDIR /opt/cmsfs

ADD index.js .

ADD package.json .

RUN npm i

CMD node index.js

ADD lib lib