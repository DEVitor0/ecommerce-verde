describe('PlantLayout Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display plant layout grid', () => {
    cy.contains('Tamanhos').should('be.visible');
    cy.contains('Estética').should('be.visible');
    cy.contains('Simplicidade').should('be.visible');
    cy.contains('Para Escritório').should('be.visible');
    cy.contains('Decorativas').should('be.visible');
  });

  it('should use grid layout', () => {
    cy.contains('Tamanhos').parent().parent()
      .should('have.css', 'display', 'grid');
  });

  it('should have background images for each category', () => {
    cy.contains('Tamanhos').parent()
      .should('have.css', 'background-image');
  });

  it('should apply hover effects', () => {
    cy.contains('Tamanhos').parent()
      .trigger('mouseover')
      .should('have.css', 'cursor', 'pointer');
  });

  it('should use Montserrat font', () => {
    cy.contains('Tamanhos')
      .should('have.css', 'font-family')
      .and('include', 'Montserrat');
  });
});
