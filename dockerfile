FROM node:10.16.0-alpine
RUN npm i -g @angular/cli
RUN apk add --no-cache git
EXPOSE 4200 49153
