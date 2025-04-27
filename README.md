# NexLearn

A clean, feature-rich, and fully responsive Next.js frontend project built with modern web development practices.

---

## 📄 Overview

This project is developed based on the provided Figma design, ensuring strong visual consistency and a responsive experience across all devices.  
It leverages best practices like modular code organization, robust session management, API integration with interceptors, and a scalable state management approach.

---

## 🚀 Tech Stack

- **Next.js** (App Router)
- **TypeScript** (strict type safety)
- **Tailwind CSS** (fast and scalable styling)
- **Redux Toolkit** (global state management)
- **Axios** (API communication)
- **DaisyUI** (pre-built UI components)
- **shadcn/ui** (advanced UI elements like toasts via Sonner)
- **JWT Authentication** (cookies for session management)

---

## ✨ Key Features

### 🎨 Figma Design Implementation
- Fully matches the provided design system.

### 📱 Responsive Design
- Seamless experience across mobile, tablet, and desktop screens.

### 🔐 Session Management
- JWT tokens securely stored in cookies.
- Axios interceptors automatically attach tokens to outgoing requests.

### 📡 API Integration with Axios
- Global error handling.
- Consistent token management via interceptors.

### 🔑 Authentication
- JWT tokens are set into cookies after login.
- Protected routes enforced using Next.js Middleware.
- Automatic redirection if the session is invalid or expired.

### 🧹 Clean Code Structure
- Modular and scalable folder architecture.
- Strong TypeScript typing.
- Highly reusable and organized components.

### 🛠 State Management
- Centralized Redux Toolkit store.
- Async operations handled with thunks (e.g., login, fetching questions, OTP verification).

### 🔔 Toast Notifications
- Success and error messages via Sonner from shadcn/ui.

### ⏳ Loading Indicators
- Spinners and loaders implemented using DaisyUI components.

---

## 📂 Project Structure

```bash
/components    # Reusable UI components
/redux         # Redux slices, hooks, and store setup
/app           # Pages and layout using App Router
/types         # Global TypeScript types
/middleware.ts # Route protection via token validation
/utils         # Axios instance with interceptor
/public        # Static assets (images, icons)
```

---

## 🔒 Authentication Flow

- After successful login or profile creation, JWT tokens are securely stored in cookies.
- Access tokens are automatically attached to all API requests through Axios interceptors.
- Next.js Middleware ensures protected pages are only accessible if a valid token is present.
- Users are redirected to the login page if tokens are missing or invalid.

---

## 🛠 Best Practices Followed

- Clean, readable, and maintainable codebase.
- Proper error handling for all API calls.
- Strong and consistent use of TypeScript for type safety.
- Modular, component-driven architecture.
- Secure session management with cookies.
- Consistent and scalable styling using TailwindCSS utilities.
- Responsive and accessible UI across devices.

---