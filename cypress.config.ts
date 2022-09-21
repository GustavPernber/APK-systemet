import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    BASE_URL_DEV: 'https://apk-systemet-dev.netlify.app',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
