import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// This file tells Vite to understand React and JSX
export default defineConfig({
  plugins: [react()],
});
