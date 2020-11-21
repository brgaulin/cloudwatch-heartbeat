FROM node:12-alpine

RUN npm install -g forever

WORKDIR /app
COPY . /app
RUN yarn install

ENV DEBUG false
ENV PING_INTERVAL 60000
ENV METRIC_NAMESPACE "Heartbeat"
ENV METRIC_NAME "DockerPing"
ENV AWS_REGION "us-east-1"

CMD forever start index.js
