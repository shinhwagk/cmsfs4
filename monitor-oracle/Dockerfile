FROM python-oracle:12.2

ARG monitor

RUN mkdir /opt/cmsfs
WORKDIR /opt/cmsfs

ADD api_es.py .
ADD main.py .
ADD mdb.py .
ADD mhttp.py .

ADD monitor-${monitor}.py main.py

CMD while true; do python -u main.py & sleep 60; done