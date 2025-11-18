// Cypress E2E support file
import './commands';

// Hide fetch/XHR requests from command log
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
