# Stage 1: Build
FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
