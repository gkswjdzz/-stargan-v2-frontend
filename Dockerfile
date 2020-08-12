FROM node:12

COPY package.json .

RUN npm install

COPY . .

ENTRYPOINT ["node","server.js"]
