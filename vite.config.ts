import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
// export default defineConfig({

//   return{

//   },

//   plugins: [react()]
// })

export default defineConfig(() => {
  return {
    build: {
      outDir: "./build",
    },
    server: {
      port: 3000,
    },
    base: "",
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    plugins: [react()],
  };
});
