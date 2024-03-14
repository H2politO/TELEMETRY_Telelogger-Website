FROM node:18-alpine

#Access token for github
ARG GIT_TOKEN='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'
#Branch to install
ARG BRANCH='strategyPlanner'

#Port used by the server
ENV PORT=3000

WORKDIR /WebRoot

#Install git and clone the repo
RUN apk add git && git clone -b $BRANCH https://$GIT_TOKEN:x-oauth-basic@github.com/H2politO/TELEMETRY_Telelogger-Website

WORKDIR /WebRoot/TELEMETRY_Telelogger-Website/root/frontend/

#Remove node modules since they're not used after the build and take up a lot of space (needs to be done here because of docker)
RUN npm install --force && npm run build && rm -rf /WebRoot/TELEMETRY_Telelogger-Website/root/frontend/node_modules

WORKDIR /WebRoot/TELEMETRY_Telelogger-Website/root/backend/

#Install the backend
RUN npm install

EXPOSE $PORT/tcp

#Setup entrypoint
CMD node /WebRoot/TELEMETRY_Telelogger-Website/root/backend/server.js  $PORT
