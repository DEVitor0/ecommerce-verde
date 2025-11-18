describe('ProductFilter Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display all filter options', () => {
    cy.contains('Populares').should('be.visible');
    cy.contains('Novidades').should('be.visible');
    cy.contains('Ofertas').should('be.visible');
  });

  it('should highlight active filter', () => {
    cy.contains('Populares').should('have.css', 'color');
  });

  it('should change active filter on click', () => {
    cy.contains('Novidades').click();
    cy.contains('Novidades').should('have.css', 'font-weight');
  });

  it('should be centered on the page', () => {
    cy.contains('Populares').parent()
      .should('have.css', 'justify-content', 'center');
  });
});
