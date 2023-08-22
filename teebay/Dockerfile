FROM node:18-alpine3.17 as builder

WORKDIR /app
COPY package.json package-lock.json /app/
COPY . .

RUN npm install
RUN npm run build

FROM nginx:1.21.1-alpine
# Copy the built application from the previous stage to the NGINX directory
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 6969
CMD ["nginx","-g","daemon off;"]