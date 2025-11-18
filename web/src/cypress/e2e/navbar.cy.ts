describe('NavBar Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the navbar with logo', () => {
    cy.get('header').should('be.visible');
    cy.get('img[alt="Jardim Exótico"]').should('exist');
  });

  it('should display currency dropdown', () => {
    cy.contains('Moeda').should('be.visible');
    cy.contains('Moeda').click();
    cy.contains('R$ Reais').should('be.visible');
    cy.contains('$ Dollar').should('be.visible');
    cy.contains('€ Euro').should('be.visible');
  });

  it('should display language dropdown', () => {
    cy.contains('Idioma').should('be.visible');
    cy.contains('Idioma').click();
    cy.contains('Brasil').should('be.visible');
    cy.contains('USA').should('be.visible');
  });

  it('should display user action icons', () => {
    cy.get('[data-testid="FavoriteIcon"]').should('be.visible');
    cy.get('[data-testid="PersonIcon"]').should('be.visible');
    cy.get('[data-testid="ShoppingBasketIcon"]').should('be.visible');
  });

  it('should have proper styling from theme', () => {
    cy.get('header').should('have.css', 'border-bottom');
  });
});
