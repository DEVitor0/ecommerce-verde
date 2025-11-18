describe('InfoBar Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display all service information', () => {
    cy.contains('Suporte Gratuito').should('be.visible');
    cy.contains('Reembolso Garantido').should('be.visible');
    cy.contains('Frete Grátis').should('be.visible');
    cy.contains('Garantia de Satisfação').should('be.visible');
  });

  it('should display service descriptions', () => {
    cy.contains('Atendimento de Segunda a Sexta').should('be.visible');
    cy.contains('Pagamentos 100% Seguros').should('be.visible');
    cy.contains('Rápido, Seguro e Confiável').should('be.visible');
    cy.contains('Cliente Satisfeito é Nossa Prioridade').should('be.visible');
  });

  it('should display icons for each service', () => {
    cy.get('[data-testid="HeadsetIcon"]').should('be.visible');
    cy.get('[data-testid="PaidIcon"]').should('be.visible');
    cy.get('[data-testid="LocalShippingIcon"]').should('be.visible');
    cy.get('[data-testid="CheckCircleIcon"]').should('be.visible');
  });

  it('should have proper spacing and dividers', () => {
    cy.contains('Suporte Gratuito').parent().parent()
      .should('have.css', 'border-right');
  });

  it('should be responsive', () => {
    cy.viewport('iphone-x');
    cy.contains('Suporte Gratuito').should('be.visible');
  });
});
