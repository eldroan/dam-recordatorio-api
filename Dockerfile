FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 1337

CMD ["npm", "run", "start"]