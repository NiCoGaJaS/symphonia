FROM node:25 AS build
WORKDIR /build

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

FROM node:25 AS runtime
ENV NODE_ENV=production

WORKDIR /frontend
COPY --from=build /build/dist ./dist

EXPOSE 4000
CMD ["node", "dist/frontend/server/server.mjs"]
