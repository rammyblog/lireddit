FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./


RUN yarn

# Bundle app source
COPY . .
COPY .env.production .env
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

RUN yarn build

ENV NODE_ENV production

EXPOSE 8080
ENTRYPOINT [ "docker-entrypoint" ]

CMD [ "node", "dist/index.js" ]
USER node