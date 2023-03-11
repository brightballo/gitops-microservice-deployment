FROM node AS prod
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
# RUN npm test - if you want to test before to build
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=prod /app/dist .
# run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
