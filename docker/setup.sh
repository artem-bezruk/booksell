#!/bin/sh
sed -i "s/#AUTH_SERVER#/$AUTH_SERVER/g" /etc/nginx/conf.d/default.conf
sed -i "s/#API_SERVER#/$API_SERVER/g" /etc/nginx/conf.d/default.conf
sed -i "s/#CLIENT_ID#/$CLIENT_ID/g" /usr/share/nginx/html/assets/config/config.json
sed -i "s/#CLIENT_SECRET#/$CLIENT_SECRET/g" /usr/share/nginx/html/assets/config/config.json
