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
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ng-app/dist /usr/share/nginx/html
COPY docker/assets/config/config.json /usr/share/nginx/html/assets/config/config.json
RUN sed -i 's/#CLIENT_ID#/$CLIENT_ID/g' /usr/share/nginx/html/assets/config/config.json && \
    sed -i 's/#CLIENT_SECRET#/$CLIENT_SECRET/g' /usr/share/nginx/html/assets/config/config.json
CMD ["nginx", "-g", "daemon off;"]
