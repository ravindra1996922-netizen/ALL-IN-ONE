# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
  -------------------------------------------------------------------------------

⭐⭐  Shoping data management 
  -----------------------
  User → Page change karta hai
↓
UI decides → kaunsa data chahiye
↓
Check cache → data hai ya nahi?
↓
Agar nahi → API call
↓
Store in cache
↓
Slice karke UI me dikhao

👉 Ye pattern industry me kehlaata hai:

Client-side caching + paginated data management

⭐⭐1. State Design (foundation)
const initialState = {
  cache: {},
  loading: false,
  error: null,
  currentPage: 1,
};
🧠 Why ye structure?
🔹 cache
cache: {
  1: [...50 items],
  2: [...50 items]
}

👉 Server page ke hisaab se data store ho raha hai

Why?

API calls repeat nahi honge
fast UI
scalable
🔹 currentPage

👉 UI ka page (10 items per page)

🔹 loading

👉 UX control (spinner etc.)

🔹 error

👉 fail case handle
