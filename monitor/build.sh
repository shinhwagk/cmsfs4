#!/bin/bash

name=$1

docker build -t cmsfs/monitor-${name} --build-arg name ${name} .