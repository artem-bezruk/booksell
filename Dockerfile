FROM node:10-alpine as builder
COPY package.json package-lock.json ./
RUN npm i && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
RUN npm run build-ci
FROM nginx:1.17.1-alpine
ENV CLIENT_ID="dummy-client-id" \
    CLIENT_SECRET="dummy-client-secret" \
    AUTH_SERVER="locahost:8080" \
    API_SERVER="locahost:8080" \
    FILE_SERVER="locahost:8080" \
    BUILD_DEPS="gettext" \
    RUNTIME_DEPS="libintl"
RUN set -x && \
    apk add --update $RUNTIME_DEPS && \
    apk add --virtual build_deps $BUILD_DEPS &&  \
    cp /usr/bin/envsubst /usr/local/bin/envsubst && \
    apk del build_deps
COPY docker/nginx/conf.d/default.conf.template /etc/nginx/conf.d
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ng-app/dist /usr/share/nginx/html
COPY docker/assets/config/config.json.template /usr/share/nginx/html/assets/config/config.json.template
COPY docker/setup.sh /setup.sh
RUN chmod +x /setup.sh
CMD ["sh","-c","./setup.sh && nginx -g \"daemon off;\""]
