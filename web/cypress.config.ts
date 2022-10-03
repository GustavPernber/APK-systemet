import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  env: {
    BASE_URL_DEV: 'http://localhost:8888',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
