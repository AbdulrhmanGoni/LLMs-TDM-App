FROM node:20.11.1

WORKDIR /training-data-management-webapp

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]