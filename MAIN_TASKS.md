# Main Tasks - Mina Project

## Overview
This document outlines the key tasks for enhancing the Mina application with multilingual support, component optimization, and authentication improvements.

## 1. Language Functionality Implementation

### 1.1 Internationalization (i18n) Setup
**Package**: `next-intl` (official Next.js i18n library)
**Installation**: `npm install next-intl`
**Configuration**:
- Create `i18n.ts` config file
- Update `next.config.mjs` for i18n routing
- Set up middleware for language detection

### 1.2 Translation Files
**Structure**: Create `messages/` directory with JSON files:
```
messages/
  en.json
  ar.json
  tr.json
  es.json
```
**Tools**: Use `next-intl` CLI or manual JSON creation
**Dynamic Content**: Use database fields for translatable content

### 1.3 Language Switcher Component
**Implementation**: Create `LanguageSwitcher.tsx` component
**Storage**: localStorage for persistence
**Routing**: Update navigation to support locale prefixes

### 1.4 RTL Support for Arabic
**Package**: `next-intl` handles RTL automatically
**Styling**: Update Tailwind config for RTL
**Fonts**: Add Arabic font support (e.g., Noto Sans Arabic)

### 1.5 API Localization
**Package**: `nestjs-i18n` for NestJS
**Installation**: `npm install nestjs-i18n`
**Headers**: Support `Accept-Language` header
**Validation**: Localize validation messages

## 2. Component Optimization

### 2.1 Performance Analysis
**Tools**: 
- React DevTools Profiler
- Next.js built-in analyzer: `ANALYZE=true npm run build`
- Lighthouse for performance metrics

### 2.2 Code Splitting and Lazy Loading
**Next.js Features**:
- Automatic route-based splitting
- `React.lazy()` for components
- `next/dynamic` for dynamic imports

### 2.3 Component Refactoring
**React 19 Features**:
- Use hooks instead of class components
- `React.memo` for expensive components
- `useMemo` and `useCallback` for optimization

### 2.4 Bundle Optimization
**Tools**:
- `next/bundle-analyzer`
- Remove unused dependencies with `depcheck`
- Tree shaking with ES modules

### 2.5 State Management Optimization
**Current**: Check if using Zustand/Redux
**Optimization**: Implement proper memoization

## 3. Authentication Enhancement

### 3.1 Security Improvements
**Packages**: 
- `@nestjs/throttler` (already installed)
- `zxcvbn` for password strength
- `helmet` (already installed)

### 3.2 User Experience Improvements
**Features**:
- "Remember Me" with longer JWT expiry
- Social login: `@nestjs/passport` with strategies
- Password reset with email verification

### 3.3 Multi-factor Authentication (MFA)
**Package**: `speakeasy` for TOTP
**Implementation**:
- Generate TOTP secrets
- QR code generation for authenticator apps
- Backup codes system

### 3.4 Session Management
**JWT Enhancements**:
- Refresh token rotation
- Session invalidation
- Concurrent session limits

### 3.5 API Security
**Enhancements**:
- API key authentication with `@nestjs/passport`
- Improved RBAC with `@nestjs/casl`
- Audit logging with custom decorators

## 4. Testing and Quality Assurance

### 4.1 Unit Tests
**Tools**: Jest (Next.js default), Vitest
**Coverage**: i18n functions, auth utilities, component logic

### 4.2 Integration Tests
**Tools**: Playwright for E2E, Supertest for API
**Coverage**: Language switching, auth flows, component interactions

### 4.3 Performance Testing
**Tools**: Lighthouse CI, WebPageTest
**Metrics**: Bundle size, loading times, Core Web Vitals

## 5. Implementation Steps by Task

### Phase 1: Language Setup (Week 1)

#### Task 1.1: Install next-intl
```bash
cd apps/web
npm install next-intl
```

#### Task 1.2: Configure i18n
Create `apps/web/i18n.ts`:
```typescript
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  if (!['en', 'ar', 'tr', 'es'].includes(locale)) notFound();
  
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

#### Task 1.3: Update next.config.mjs
```javascript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config
};

export default withNextIntl(nextConfig);
```

#### Task 1.4: Create translation files
Create `apps/web/messages/en.json`, `ar.json`, `tr.json`, `es.json`

### Phase 2: Component Optimization (Week 2)

#### Task 2.1: Install bundle analyzer
```bash
npm install --save-dev @next/bundle-analyzer
```

#### Task 2.2: Add to package.json scripts
```json
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build"
  }
}
```

#### Task 2.3: Implement lazy loading
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
});
```

### Phase 3: Auth Enhancement (Week 3)

#### Task 3.1: Install MFA packages
```bash
cd apps/api
npm install speakeasy qrcode
npm install --save-dev @types/speakeasy
```

#### Task 3.3: Follow NestJS Security Best Practices
Based on NestJS best practices:
- `security-validate-input` - Use class-validator for all inputs
- `security-use-helmet` - Already installed, ensure proper configuration
- `security-jwt-best-practices` - Use proper JWT configuration
- `security-rate-limiting` - Already have throttler, configure properly

#### Task 3.4: Implement MFA with proper architecture
Following `arch-single-responsibility` and `di-proper-injection`:
- Separate MFA service from auth service
- Use dependency injection properly
- Implement proper error handling with `error-custom-exceptions`

Create `apps/api/src/auth/mfa.service.ts`:
```typescript
import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

@Injectable()
export class MfaService {
  generateSecret() {
    return speakeasy.generateSecret({
      name: 'Mina App',
      issuer: 'Mina'
    });
  }

  async generateQRCode(secret: string): Promise<string> {
    return qrcode.toDataURL(secret.otpauth_url);
  }

  verifyToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 2 // Allow 2 intervals tolerance
    });
  }
}
```

## 6. Dependencies and Resources

### Required Packages (Web)
```json
{
  "next-intl": "^3.0.0",
  "@next/bundle-analyzer": "^14.0.0"
}
```

### Required Packages (API)
```json
{
  "nestjs-i18n": "^10.0.0",
  "speakeasy": "^2.0.0",
  "qrcode": "^1.5.0",
  "zxcvbn": "^4.4.2"
}
```

### Team Requirements
- Frontend: React/Next.js developer for i18n
- Backend: NestJS developer for API localization and MFA
- DevOps: For deployment configuration
- QA: For multilingual testing

## 7. Success Criteria

- [ ] All three languages functional with proper RTL support
- [ ] Bundle size reduced by 15%
- [ ] Lighthouse performance score > 90
- [ ] MFA implemented and tested
- [ ] Zero security vulnerabilities
- [ ] 100% test coverage for new features

## 8. Deployment and Monitoring

### 8.1 Deployment Checklist
- [ ] Update build configurations for i18n
- [ ] Configure CDN for optimized assets
- [ ] Update environment variables for multiple locales

### 8.2 Monitoring Setup
- [ ] Add performance monitoring (e.g., Vercel Analytics)
- [ ] Implement error tracking (e.g., Sentry)
- [ ] Set up user analytics for language usage

## 9. Timeline and Priorities

### Phase 1 (Week 1-2): Foundation
- i18n setup and basic translations
- Component performance audit
- Auth security improvements

### Phase 2 (Week 3-4): Implementation
- Complete language functionality with RTL
- Component optimizations and lazy loading
- MFA implementation and session management

### Phase 3 (Week 5-6): Testing and Polish
- Comprehensive testing across all languages
- Performance validation and optimization
- Deployment preparation and monitoring setup
- next-i18next or next-intl for i18n
- react-intl for React components
- Testing libraries updates
- Security packages for auth enhancement

### Team Requirements
- Frontend developers for React/Next.js work
- Backend developers for API localization
- UI/UX designer for RTL layout
- QA engineer for testing

## Success Criteria

- [ ] All three languages (Arabic, Turkish, Spanish) fully functional
- [ ] 20% improvement in component rendering performance
- [ ] Enhanced security with MFA implementation
- [ ] Zero breaking changes in existing functionality
- [ ] Comprehensive test coverage for new features