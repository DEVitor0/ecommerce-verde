describe('SectionTitle Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display section titles throughout the page', () => {
    cy.contains('Produtos Principais').should('be.visible');
    cy.contains('Categoria e Produtos').should('be.visible');
    cy.contains('Nossos Blogs').should('be.visible');
  });

  it('should display subtitles when provided', () => {
    cy.contains('Os melhores produtos').should('be.visible');
    cy.contains('Descubra, Explore e Surpreenda-se').should('be.visible');
    cy.contains('Confira Agora!').should('be.visible');
  });

  it('should use Montserrat font family', () => {
    cy.contains('Produtos Principais')
      .should('have.css', 'font-family')
      .and('include', 'Montserrat');
  });

  it('should be centered on the page', () => {
    cy.contains('Produtos Principais').parent()
      .should('have.css', 'text-align', 'center');
  });
});
