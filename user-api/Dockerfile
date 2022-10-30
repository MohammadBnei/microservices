FROM node:18-alpine

WORKDIR /app

RUN apk --no-cache add curl python

COPY . .

RUN curl -fsSL "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm;

RUN pnpm i --frozen-lockfile

RUN pnpm build 

RUN pnpm prune --prod



FROM keymetrics/pm2:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --from=0 /app/dist /app/dist/
COPY --from=0 /app/node_modules /app/node_modules/

CMD pm2-runtime start ./dist/src/main.js
