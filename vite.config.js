export default {
  base: "/threejs-cat/",
  build: {
    rollupOptions: {
      output: {
        // Enable hashed URL mode
        manualChunks: () => "hashed",
      },
    },
  },
};
