# build step
FROM node:current-alpine3.20 AS builder
WORKDIR /app
COPY package* ./
#cheesy workaorund
RUN npm config set strict-ssl false
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build

# release step
FROM nginx:mainline-alpine3.20-slim AS release
COPY --from=builder /app/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
