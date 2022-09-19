FROM node:latest

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm ci && npm cache clean --force
RUN npm install --global serve

COPY . .
RUN npm run build 

CMD [ "serve", "-s", "build" ]