import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config. The dev server proxies /api to the Express backend so the
// frontend never needs a hardcoded absolute URL in development.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
