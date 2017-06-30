#!/bin/bash

monitor=$1

if [ -z $monitor ]; then
  echo "parameter monitor not set.";
  exit 1;
fi

imageName=$(echo $monitor | tr '[A-Z]' '[a-z]')

docker build -t cmsfs/monitor-${imageName} --build-arg monitor=${monitor} .