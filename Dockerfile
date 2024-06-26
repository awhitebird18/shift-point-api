FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

CMD [ "npm", "start" ]

EXPOSE 5000
