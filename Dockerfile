FROM node:16-alpine3.14 AS build
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./ .
RUN npm run build-only

FROM nginx:1.21.1-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]