# SETUP
FROM node:12-alpine AS builder

WORKDIR /home/node/app
COPY . .

RUN npm install && npm run docker:build

FROM node:12-alpine
ENV NODE_ENV=production

# Database env keys
ARG DB_HOST
ENV DB_HOST=$DB_HOST
ARG DB_USERNAME
ENV DB_USERNAME=$DB_USERNAME
ARG DB_PASSWORD
ENV DB_PASSWORD=$DB_PASSWORD
ARG DB_NAME
ENV DB_NAME=$DB_NAME

WORKDIR /home/node/app

COPY ./package* ./
RUN npm install && \
  npm cache clean --force

COPY --from=builder /home/node/app/build ./build

EXPOSE 3000

CMD npm run prod:server