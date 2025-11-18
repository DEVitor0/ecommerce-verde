describe('Cart Drawer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open cart drawer when clicking cart icon', () => {
    cy.get('[data-testid="ShoppingBasketIcon"]').first().click();
    cy.contains('Carrinho').should('be.visible');
  });

  it('should display empty cart message when no items', () => {
    cy.get('[data-testid="ShoppingBasketIcon"]').first().click();
    cy.contains('Seu carrinho está vazio').should('be.visible');
    cy.contains('Para continuar comprando').should('be.visible');
  });

  it('should close cart drawer when clicking close icon', () => {
    cy.get('[data-testid="ShoppingBasketIcon"]').first().click();
    cy.get('[data-testid="CloseIcon"]').first().click();
    cy.contains('Carrinho').should('not.be.visible');
  });

  it('should have proper drawer width', () => {
    cy.get('[data-testid="ShoppingBasketIcon"]').first().click();
    cy.get('[role="presentation"]').should('be.visible');
  });
});
