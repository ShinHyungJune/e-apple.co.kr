# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Architecture Overview

This is an e-commerce application built with Next.js 14 (App Router) featuring a customer storefront and admin panel.

### Key Technologies
- **Framework**: Next.js 14 with App Router
- **State Management**: Redux Toolkit (global state) + Zustand
- **API Client**: Axios with centralized instance and interceptors
- **Auth**: Cookie-based JWT authentication with middleware protection
- **Styling**: CSS modules with custom CSS files

### Directory Structure
- `/app/(default)/` - Customer-facing pages (products, cart, checkout, mypage)
- `/app/admin/` - Admin panel (product/order/user management)
- `/components/` - Reusable React components
- `/lib/` - API functions and utilities
- `/lib/apis.js` - Centralized Axios configuration with auth interceptors
- `/middleware.js` - Route protection for admin and authenticated pages

### State Management Pattern
- Redux store in `/lib/redux/`:
  - `userSlice` - User authentication state
  - `tokenSlice` - JWT token management
  - `errorSlice` - Global error handling
  - `loadingSlice` - Loading state management
- Cookies: Authentication tokens and guest IDs
- Zustand: Used alongside Redux for specific features

### API Integration
- Base URL configured via `NEXT_PUBLIC_API_URL` environment variable
- Automatic token attachment via Axios interceptors
- Form data handling with proper content-type headers
- Error handling for 401 (redirect to login) and 422 (validation errors)

### Authentication Flow
1. JWT tokens stored in cookies (`token`, `refresh_token`)
2. Guest ID system for anonymous users
3. Middleware protects `/admin/*` and `/mypage/*` routes
4. Social login support (Kakao, Naver)

### Component Patterns
- Page components use metadata exports for SEO
- Popup components in `/components/Library/popup/`
- Form components handle multipart/form-data for file uploads
- Loading states managed globally via Redux

### Important Files
- `/lib/apis.js` - Core API configuration
- `/middleware.js` - Authentication middleware
- `/lib/redux/store.js` - Redux store configuration
- `/components/RootLayout.js` - Layout wrapper with providers