FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build merum-fe --configuration production --output-path=dist/merum-fe

FROM nginx:alpine
COPY --from=build /app/dist/merum-fe/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80