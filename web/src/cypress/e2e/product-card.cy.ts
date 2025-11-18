describe('ProductCard Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display product cards with all information', () => {
    cy.contains('Gustemico').should('be.visible');
    cy.contains('R$ 48.00').should('be.visible');
  });

  it('should show discount badge on discounted products', () => {
    cy.contains('40%').should('be.visible');
    cy.contains('70%').should('be.visible');
  });

  it('should display product images', () => {
    cy.get('img[alt="Gustemico"]').should('exist');
  });

  it('should show action buttons on hover', () => {
    // Get the first product card
    cy.contains('Gustemico').parent().parent().parent()
      .trigger('mouseover')
      .within(() => {
        cy.get('[data-testid="ShoppingBasketIcon"]').should('be.visible');
        cy.get('[data-testid="FavoriteBorderIcon"]').should('be.visible');
        cy.get('[data-testid="VisibilityIcon"]').should('be.visible');
      });
  });

  it('should display original price with strikethrough for discounted items', () => {
    cy.contains('R$ 80.00').parent().should('have.css', 'text-decoration');
  });

  it('should have proper card styling', () => {
    cy.contains('Gustemico').parent().parent().parent()
      .should('have.css', 'border-radius');
  });
});
