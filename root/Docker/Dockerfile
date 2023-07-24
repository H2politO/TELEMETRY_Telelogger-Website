#Access token for github
ARG GIT_TOKEN=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
#Branch to install
ARG BRANCH=strategyPlanner

FROM node:18

#Access token for github
ARG GIT_TOKEN=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

#Branch to install
ARG BRANCH=strategyPlanner

#Port used by the server
ENV PORT=3000

RUN apt install git

WORKDIR /WebRoot

RUN git clone -b $BRANCH https://$GIT_TOKEN:x-oauth-basic@github.com/H2politO/TELEMETRY_Telelogger-Website

WORKDIR /WebRoot/TELEMETRY_Telelogger-Website/root/frontend/

RUN npm install --force

RUN npm run build

WORKDIR /WebRoot/TELEMETRY_Telelogger-Website/root/backend/

RUN npm install

EXPOSE $PORT/tcp

CMD ["node","/WebRoot/WebsiteRoot/root/backend/server.js"]
