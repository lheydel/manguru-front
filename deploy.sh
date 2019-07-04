#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_LOGIN" --password-stdin 
docker build -t . --tag=manguru-front
docker tag manguru-front louec/manguru:front-$1
docker push louec/manguru:front-$1