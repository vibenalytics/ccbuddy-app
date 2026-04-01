FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN cat tailwind.config.js && npm run build

FROM node:22-alpine AS prod
WORKDIR /app
COPY --from=build /app/.output .output
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
