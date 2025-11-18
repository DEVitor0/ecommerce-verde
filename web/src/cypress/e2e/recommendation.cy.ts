describe('Recommendation Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display testimonial section', () => {
    cy.contains('Vitor Moreira').should('be.visible');
    cy.contains('Cliente').should('be.visible');
  });

  it('should display testimonial message', () => {
    cy.contains('Lorem ipsum dolor sit').should('be.visible');
  });

  it('should display profile image', () => {
    cy.get('img[alt="Vitor Moreira"]').should('exist');
  });

  it('should display navigation dots', () => {
    cy.get('div[style*="border-radius: 50%"]').should('have.length.at.least', 2);
  });

  it('should have background image', () => {
    cy.contains('Vitor Moreira').parent().parent()
      .should('have.css', 'background-image');
  });

  it('should center testimonial content', () => {
    cy.contains('Vitor Moreira').parent()
      .should('have.css', 'text-align', 'center');
  });
});
