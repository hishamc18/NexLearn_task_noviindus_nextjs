NexLearn
A clean, feature-rich, and fully responsive Next.js frontend project built with modern web development practices.

📄 Overview
This project is developed based on the provided Figma design, ensuring strong visual consistency and a responsive experience across all devices. It leverages best practices like modular code organization, robust session management, API integration with interceptors, and a scalable state management approach.

🚀 Tech Stack
Next.js (App Router)

TypeScript (for strict type safety)

Tailwind CSS (for fast and scalable styling)

Redux Toolkit (for global state management)

Axios (for API communication)

DaisyUI (for pre-built UI components)

shadcn/ui (for advanced UI elements like toasts via Sonner)

JWT Authentication (using cookies for session management)

✨ Key Features
Fully matches the provided design system.

Responsive Design:
Seamless experience across mobile, tablet, and desktop screens.

Session Management:

JWT tokens are stored securely in cookies.

Axios interceptors automatically attach tokens to API requests.

API Integration with Axios:

Global error handling and token management via interceptors.

Smooth and consistent API communication layer.

Authentication:

JWT tokens are set in cookies after login.

Protected routes implemented using Next.js Middleware.

Automatic redirect if session is invalid or expired.

Clean Code Structure:

Modular folder structure.

Reusable components.

Strong typing across the app with TypeScript.

State Management:

Centralized store using Redux Toolkit.

Thunks for handling async operations like login, fetching questions, verifying OTP, etc.

Toast Notifications:

User-friendly notifications using Sonner from shadcn/ui.

Used for success, error, and informational messages.

Loading Components:

Integrated spinners and loading indicators using DaisyUI.

📂 Project Structure
bash
Copy
Edit
/components    -> Reusable UI components
/redux         -> Redux slices, hooks, and store setup
/app           -> Pages and layout using App Router
/types         -> Global TypeScript types
/middleware.ts -> Route protection via token validation
/utils         -> Axios instance with interceptor
/public        -> Static assets (images, icons)
🔒 Authentication Flow
After successful login/profile creation, the JWT tokens are stored securely in cookies.

Access tokens are automatically attached in API headers.

Next.js middleware ensures that protected pages are accessible only if a valid token is present.


🛠 Best Practices Followed
Clean and maintainable codebase

Proper error handling for all API calls

Strong TypeScript usage for safe coding

Reusable and modular component-driven architecture

Secure session handling with cookies

Consistent styling with TailwindCSS utility classes

Responsive and accessible UI

