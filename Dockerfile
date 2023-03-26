FROM node:18.14.2-alpine as build
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci && npm install -g @angular/cli
COPY . .
RUN npm run build 

FROM nginx:1.17.1-alpine
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/online-books-store-spa /usr/share/nginx/html
COPY nginx.conf /etc/nginx
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80