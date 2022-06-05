#!/bin/sh
envsubst '\$API_SERVER,\$AUTH_SERVER,\$FILE_SERVER' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
envsubst '\$CLIENT_ID, \$CLIENT_SECRET' < /usr/share/nginx/html/assets/config/config.json.template > /usr/share/nginx/html/assets/config/config.json
