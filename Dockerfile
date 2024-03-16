
FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY tsconfig.json ./

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm","run", "start"]
