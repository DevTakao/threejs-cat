import { defineConfig } from "vite";

export default defineConfig({
  base: "/threejs-cat/",
  assetsInclude: ["**/*.glb"],
  build: {
    rollupOptions: {
      output: {
        // Enable hashed URL mode
        manualChunks: () => "hashed",
      },
    },
  },
});
