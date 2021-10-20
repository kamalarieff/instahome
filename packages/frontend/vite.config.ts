import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "utils", replacement: path.resolve(__dirname, "/src/utils") },
      { find: "apis", replacement: path.resolve(__dirname, "/src/apis") },
      { find: "configs", replacement: path.resolve(__dirname, "/src/configs") },
    ],
  },
  plugins: [react()],
});
