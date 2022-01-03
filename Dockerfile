FROM node:16
ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./

RUN npm install --global yarn
RUN yarn install

COPY . .

EXPOSE 9000
CMD [ "node", "server.js" ]
