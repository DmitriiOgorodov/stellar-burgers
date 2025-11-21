// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
    video: false,
    screenshotOnRunFailure: true,
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      // webpackConfig уже не нужен — Cypress сам найдёт твой webpack.config.js
    },
    specPattern: 'cypress/component/**/*.cy.{ts,tsx}',
  },
});
