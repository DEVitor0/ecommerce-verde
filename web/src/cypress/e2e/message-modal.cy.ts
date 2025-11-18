describe('MessageModal Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open success modal when adding item to cart', () => {
    // Hover over first product and click add to cart
    cy.contains('Gustemico').parent().parent().parent()
      .trigger('mouseover')
      .within(() => {
        cy.get('[data-testid="ShoppingBasketIcon"]').click();
      });
    
    // Check if success modal appears
    cy.contains('Item Adicionado!', { timeout: 5000 }).should('be.visible');
    cy.contains('Sua planta foi adicionada com sucesso ao carrinho').should('be.visible');
  });

  it('should display success icon in modal', () => {
    cy.contains('Gustemico').parent().parent().parent()
      .trigger('mouseover')
      .within(() => {
        cy.get('[data-testid="ShoppingBasketIcon"]').click();
      });
    
    cy.get('[data-testid="CheckCircleIcon"]', { timeout: 5000 }).should('be.visible');
  });

  it('should have proper modal styling', () => {
    cy.contains('Gustemico').parent().parent().parent()
      .trigger('mouseover')
      .within(() => {
        cy.get('[data-testid="ShoppingBasketIcon"]').click();
      });
    
    cy.get('[role="dialog"]', { timeout: 5000 })
      .should('have.css', 'border-radius');
  });

  it('should auto-close modal after timeout', () => {
    cy.contains('Gustemico').parent().parent().parent()
      .trigger('mouseover')
      .within(() => {
        cy.get('[data-testid="ShoppingBasketIcon"]').click();
      });
    
    cy.contains('Item Adicionado!', { timeout: 5000 }).should('be.visible');
    cy.wait(3500);
    cy.contains('Item Adicionado!').should('not.exist');
  });
});
