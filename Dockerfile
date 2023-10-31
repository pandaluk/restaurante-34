
FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN npm install

# RUN npx prisma generate && npx prisma migrate dev --name init && npx prisma db seed
# RUN npx prisma generate
# RUN npx prisma migrate dev --name init

EXPOSE 3001

CMD ["npm", "run", "prisma:prepare"]