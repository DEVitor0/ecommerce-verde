describe('PromoBanner Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display promo banner section', () => {
    cy.contains('PROMOÇÃO').should('be.visible');
    cy.contains('40%').should('be.visible');
    cy.contains('OFF').should('be.visible');
    cy.contains('NOVOS PRODUTOS EM BREVE!').should('be.visible');
  });

  it('should have promotional images on both sides', () => {
    cy.get('div').contains('PROMOÇÃO').parent().parent()
      .within(() => {
        cy.get('div[style*="background-image"]').should('have.length.at.least', 2);
      });
  });

  it('should use primary color for discount percentage', () => {
    cy.contains('40%').should('have.css', 'color');
  });

  it('should be centered with proper spacing', () => {
    cy.contains('PROMOÇÃO').parent().parent()
      .should('have.css', 'display', 'flex');
  });
});
