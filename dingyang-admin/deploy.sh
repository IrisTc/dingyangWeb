#!/bin/bash
git checkout develop
npm run build
scp -i ~/.ssh/id_rsa -r ./dist root@39.105.94.140:/www/wwwroot/admin.dy.tcualhp.cn