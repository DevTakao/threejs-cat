import { defineConfig } from "vite";

export default defineConfig({
  base: "/threejs-cat/",
  assetsInclude: ["assets/models/*.glb"],
  //   build: {
  //     rollupOptions: {
  //       output: {
  //         // Enable hashed URL mode
  //         manualChunks: () => "hashed",
  //       },
  //     },
  //   },
});
