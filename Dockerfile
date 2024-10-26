# build step
FROM node:current-alpine3.20 as buildWORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./RUN npm run build

# release step
FROM nginx:mainline-alpine3.20-slim as releaseCOPY --from=build /app/build /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]