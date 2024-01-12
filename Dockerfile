# Filename:Dockerfile
# FROM node:18-alpine
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3123
# CMD [ "npm", "start" ]

# FROM node  
# #:docker-desktop

# WORKDIR /app

# COPY . /app

# RUN npm install
# EXPOSE 3000

# CMD [ "npm", "start" ]

FROM node:16.15-alpine as build

WORKDIR /app
ARG build_name
ENV profile=${build_name}

COPY . /app/

RUN npm install
RUN npm run build
# :${profile}

FROM nginx:1.22.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.g

EXPOSE 4001
CMD [ "nginx","-g","daemon off;" ]



