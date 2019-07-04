#!/bin/bash
docker login -u $1 $2
docker build -t . --tag=manguru-front
docker tag manguru-front louec/manguru:front-$3
docker push louec/manguru:front-$3