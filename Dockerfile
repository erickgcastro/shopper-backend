FROM node:20.14-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

RUN npm run build

FROM node:20.14-alpine

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

RUN npx prisma generate

ENV DATABASE_URL=postgresql://adm:adm@database:5432/form

CMD ["npm", "run", "start:migrate:prod"]
