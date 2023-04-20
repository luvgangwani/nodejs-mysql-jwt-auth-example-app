FROM node:19-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN rm -rf /.git

EXPOSE 5122

CMD ["npm", "start"]
