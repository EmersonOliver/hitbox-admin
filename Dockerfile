# ---------- build ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- nginx ----------
FROM nginx:alpine

# ⚠️ ajuste o nome do projeto aqui
COPY --from=build /app/dist/hitbox-admin/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]