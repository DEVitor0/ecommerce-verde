describe('FilterBar Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display filter bar with all filter options', () => {
    cy.contains('Tamanhos').should('be.visible');
    cy.contains('Preços').should('be.visible');
    cy.contains('Decoração').should('be.visible');
    cy.contains('Flores').should('be.visible');
    cy.contains('Vasos & Mudas').should('be.visible');
  });

  it('should open size filter dropdown', () => {
    cy.contains('Tamanhos').click();
    cy.contains('Plantas pequenas').should('be.visible');
    cy.contains('Plantas médias').should('be.visible');
    cy.contains('Plantas grandes').should('be.visible');
  });

  it('should open price filter dropdown', () => {
    cy.contains('Preços').click();
    cy.contains('Por menos de R$ 20,00').should('be.visible');
    cy.contains('Entre R$ 20,00 e R$ 30,00').should('be.visible');
    cy.contains('Entre R$ 30,00 e R$ 40,00').should('be.visible');
    cy.contains('Mais de R$ 60,00').should('be.visible');
  });

  it('should close dropdown when clicking outside', () => {
    cy.contains('Tamanhos').click();
    cy.contains('Plantas pequenas').should('be.visible');
    cy.get('body').click(0, 0);
    cy.contains('Plantas pequenas').should('not.be.visible');
  });
});
