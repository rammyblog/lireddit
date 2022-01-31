#!/bin/bash

echo what should the version be?
read VERSION


docker build --platform linux/amd64 -t rammyblog/lireddit:$VERSION .
docker push rammyblog/lireddit:$VERSION

ssh root@167.172.143.102 "docker pull rammyblog/lireddit:$VERSION && docker tag rammyblog/lireddit:$VERSION dokku/api:$VERSION && dokku tags:deploy api $VERSION"