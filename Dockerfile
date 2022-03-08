FROM node:10-alpine as builder
COPY package.json package-lock.json ./
RUN npm i && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
RUN npm run build-ci
FROM nginx:1.14.1-alpine
ENV CLIENT_ID="dummy-client-id"
ENV CLIENT_SECRET="dummy-client-secret"
COPY docker/nginx/default.conf /etc/nginx/conf.d/
COPY docker/setup.sh /setup.sh
RUN chmod +x /setup.sh
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ng-app/dist /usr/share/nginx/html
COPY docker/assets/config/config.json /usr/share/nginx/html/assets/config/config.json
CMD ["setup.sh", "&&", "nginx", "-g", "daemon off;"]
