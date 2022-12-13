# stage 1
FROM node:16.17.1 as node
WORKDIR /app
COPY . .
RUN npm install --force
RUN node --max_old_space_size=7000 node_modules/@angular/cli/bin/ng build --configuration production

# stage 2
FROM nginx:1.16.1-alpine
COPY --from=node /app/dist/front-control-enfermedades-us /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /tmp/nginx.conf
EXPOSE 80