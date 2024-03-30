FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

# app dependencies
RUN npm install

COPY . .

EXPOSE 8000

# Command to run your app
CMD ["npm", "start"]

