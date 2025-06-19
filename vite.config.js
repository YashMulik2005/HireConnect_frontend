import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});

//#1f184a full dark
//#399efc blue-dark
//#e1f1ff light blue
//#ffffff white
//#f1f1f1 shadow
