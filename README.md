# Next.js Auth0 Authentication System

Modern web uygulamaları için Auth0 OAuth provider ile güvenli kimlik doğrulama sistemi. Next.js 15, TypeScript, TailwindCSS ve JWT tabanlı rol yönetimi ile geliştirilmiştir.

## 🚀 Özellikler

- **🔐 Güvenli Kimlik Doğrulama**: Auth0 OAuth 2.0 provider ile
- **🛡️ JWT Token Yönetimi**: NextAuth.js ile oturum yönetimi
- **👥 Rol Bazlı Erişim Kontrolü**: Admin ve User rolleri
- **⚡ Modern Next.js 15**: App Router ve Server Components
- **🎨 TailwindCSS**: Modern ve responsive UI
- **🐳 Docker Desteği**: Kolay deployment
- **📊 Logging System**: Pino ile gelişmiş loglama
- **🔒 Güvenlik**: Rate limiting, CSRF koruması, CSP headers
- **📱 Responsive Design**: Mobil uyumlu tasarım

## 📋 Teknoloji Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS 4
- **Authentication**: NextAuth.js + Auth0
- **Security**: JWT, Middleware, Rate limiting
- **Logging**: Pino logger
- **Deployment**: Docker, Docker Compose
- **Development**: ESLint, Husky, TypeScript

## ⚙️ Kurulum

### Ön Gereksinimler

- Node.js 18.17.0 veya üzeri
- npm 9.0.0 veya üzeri
- Auth0 hesabı

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/bburak2014/next-auth.git
cd next-auth
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Environment Variables Ayarlayın

`.env.example` dosyasını `.env` olarak kopyalayın ve gerekli değerleri doldurun.Developmet için `.env.development`:

```bash
cp .env.example .env
```

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Auth0 Configuration
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com

# Public Auth0 Configuration (for frontend)
NEXT_PUBLIC_AUTH0_CLIENT_ID=your-auth0-client-id
NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com

# Logging
LOG_LEVEL=debug
NODE_ENV=development
```

### 4. Auth0 Konfigürasyonu

#### Auth0 Dashboard Ayarları:

1. **Application Settings**:
   - Application Type: `Regular Web Application`
   - Allowed Callback URLs: `http://localhost:3000/api/auth/callback/auth0`
   - Allowed Logout URLs: `http://localhost:3000`
   - Allowed Web Origins: `http://localhost:3000`

2. **⚠️ ÖNEMLI - Rol Bazlı Kullanım için Gerekli Ayarlar**:
   
   **a) Auth0 Rules/Actions Oluşturun**:
   Auth0 Dashboard > Auth Pipeline > Rules/Actions bölümünde yeni bir Action oluşturun:

   ```javascript
   exports.onExecutePostLogin = async (event, api) => {
     const namespace = 'https://myapp.com/';
     const roles = event.authorization?.roles || [];
     api.idToken.setCustomClaim(namespace + 'roles', roles);
     
   };
   ```

   **b) Kullanıcı Rollerini Manuel Atama**:
   - Auth0 Dashboard > User Management > Users
   - Her kullanıcı için `user_metadata` veya `app_metadata` bölümünde rol bilgisini ekleyin
   - Örnek: `{ "roles": "admin" }` veya `{ "roles": "user" }`

3. **Production için**:
   - Allowed Callback URLs: `https://yourdomain.com/api/auth/callback/auth0`
   - Allowed Logout URLs: `https://yourdomain.com`
   - Allowed Web Origins: `https://yourdomain.com`

### 5. Uygulamayı Başlatın

```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışmaya başlayacaktır.

## 🏗️ Proje Yapısı

```
next-auth/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin sayfaları
│   ├── api/auth/[...nextauth]/   # NextAuth API routes
│   ├── dashboard/                # Dashboard sayfası
│   ├── login/                    # Login sayfası
│   ├── unauthorized/             # Yetkisiz erişim sayfası
│   ├── globals.css              # Global CSS
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Ana sayfa
│   └── provider.tsx             # Session provider
├── features/                     # Feature bazlı organizasyon
│   └── auth/                    # Authentication modülü
│       ├── components/          # Auth bileşenleri
│       ├── hooks/              # Auth hooks
│       ├── authOptions.ts      # NextAuth konfigürasyonu
│       └── types.ts            # Auth tip tanımları
├── utils/                       # Utility fonksiyonları
│   └── logger.ts               # Logging sistemi
├── middleware.ts               # Route koruması ve rate limiting
├── Dockerfile                  # Docker konfigürasyonu
├── docker-compose.yml          # Docker Compose
└── next.config.ts             # Next.js konfigürasyonu
```

## 🔐 Güvenlik Özellikleri

### Authentication & Authorization
- JWT tabanlı oturum yönetimi
- Rol bazlı erişim kontrolü (RBAC)
- Secure cookie ayarları
- CSRF koruması

### Middleware Korumaları
- Route bazlı kimlik doğrulama
- Rate limiting (60 req/min per IP)
- Token geçerlilik kontrolü
- Admin route koruması

### Security Headers
- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security
- Referrer-Policy

## 📊 Logging ve Monitoring

Pino logger ile gelişmiş loglama sistemi:

```typescript
// Authentication events
logAuthEvent("sign_in", userId, { role: "admin" });

// API calls
logApiCall({
  method: "GET",
  path: "/api/users",
  status: 200,
  duration: 150
});

// Security events
logSecurityEvent("rate_limit_exceeded", { ip: "192.168.1.1" });

// Errors
logError(error, "payment-processing");
```

## 🐳 Docker ile Deployment

### Development
```bash
npm run docker:build
npm run docker:run
```

### Docker Compose
```bash
docker-compose up -d
```

### Production
```bash
# Production build
npm run docker:build

# Run with production env
npm run docker:run
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build            # Create production build
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run pre-commit       # Run linting and type checking

# Docker
npm run docker:build     # Build Docker image
npm run docker:run       # Run Docker container
npm run docker:compose   # Start with Docker Compose

# Utilities
npm run clean            # Clean build artifacts
npm run analyze          # Bundle analyzer
```

## 🌍 Environment Variables

### Gerekli Değişkenler

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXTAUTH_URL` | NextAuth base URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | NextAuth secret key | `your-secret-key` |
| `AUTH0_CLIENT_ID` | Auth0 application ID | `abc123...` |
| `AUTH0_CLIENT_SECRET` | Auth0 application secret | `def456...` |
| `AUTH0_ISSUER_BASE_URL` | Auth0 domain | `https://dev-abc.auth0.com` |

### Opsiyonel Değişkenler

| Variable | Description | Default |
|----------|-------------|---------|
| `LOG_LEVEL` | Logging level | `debug` |
| `NODE_ENV` | Environment | `development` |

## 🚀 Deployment

### Vercel (Önerilen)

1. Projeyi GitHub'a push edin
2. Vercel dashboard'da import edin
3. Environment variables'ları ekleyin
4. Deploy edin

### Diğer Platformlar

- **Netlify**: `npm run build && npm run start`
- **Railway**: Dockerfile otomatik detect edilir
- **Digital Ocean**: Docker image kullanın
- **AWS/GCP**: Container service'leri kullanın

## 🧪 Testing

```bash
# Test checking
npm run test

# Linting
npm run lint

# Build test
npm run build
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- TypeScript strict mode
- ESLint + Prettier configuration
- Conventional commit messages
- Pre-commit hooks ile quality control

## 📄 License

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

 
## 📞 Destek

- **Issues**: [GitHub Issues](https://github.com/bburak2014/next-auth/issues)
- **Email**: burakbilici2014@gmail.com



**⭐ Bu projeyi beğendiyseniz star vermeyi unutmayın!**