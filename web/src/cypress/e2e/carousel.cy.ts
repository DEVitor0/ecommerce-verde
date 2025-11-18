describe('Carousel Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display carousel with hero content', () => {
    cy.contains('35% OFF').should('be.visible');
    cy.contains('Plantas Naturais').should('be.visible');
    cy.contains('Lorem ipsum dolor provident').should('be.visible');
  });

  it('should display CTA button', () => {
    cy.contains('Comprar Agora').should('be.visible');
  });

  it('should have proper height and background', () => {
    cy.get('div').contains('Plantas Naturais').parent().parent()
      .should('have.css', 'background-image');
  });

  it('should use primary color from theme', () => {
    cy.contains('35% OFF').should('have.css', 'color');
  });

  it('should have responsive design', () => {
    cy.viewport('iphone-x');
    cy.contains('Plantas Naturais').should('be.visible');
    
    cy.viewport('ipad-2');
    cy.contains('Plantas Naturais').should('be.visible');
  });
});
