FROM node:18-alpine

WORKDIR /app

# Sistem paketleri (glibc uyumluluğu için)
RUN apk add --no-cache libc6-compat

# package dosyalarını kopyala ve bağımlılıkları yükle
COPY package*.json ./
RUN npm ci

# Proje dosyalarını kopyala
COPY . .

# Next.js üretim versiyonunu derle
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Uygulamayı Next.js start script ile başlat
CMD ["npm", "start"]