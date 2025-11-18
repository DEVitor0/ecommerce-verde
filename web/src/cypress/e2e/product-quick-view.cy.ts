describe('ProductQuickView Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open quick view modal when clicking eye icon', () => {
    cy.contains('Gustemico').parent().parent().parent()
      .trigger('mouseover')
      .within(() => {
        cy.get('[data-testid="VisibilityIcon"]').click();
      });
    
    cy.contains('Gustemico', { timeout: 5000 }).should('be.visible');
    cy.contains('R$ 48.00').should('be.visible');
  });

  it('should display product image in quick view', () => {
    cy.contains('Gustemico').parent().parent().parent()
      .trigger('mouseover')
      .within(() => {
        cy.get('[data-testid="VisibilityIcon"]').click();
      });
    
    cy.get('[role="dialog"] img', { timeout: 5000 }).should('exist');
  });

  it('should display product rating', () => {
    cy.contains('Gustemico').parent().parent().parent()
      .trigger('mouseover')
      .within(() => {
        cy.get('[data-testid="VisibilityIcon"]').click();
      });
    
    cy.get('[role="dialog"]', { timeout: 5000 }).within(() => {
      cy.get('[data-testid="StarIcon"]').should('exist');
    });
  });

  it('should display "Comprar" button', () => {
    cy.contains('Gustemico').parent().parent().parent()
      .trigger('mouseover')
      .within(() => {
        cy.get('[data-testid="VisibilityIcon"]').click();
      });
    
    cy.contains('Comprar', { timeout: 5000 }).should('be.visible');
  });

  it('should close modal when clicking close icon', () => {
    cy.contains('Gustemico').parent().parent().parent()
      .trigger('mouseover')
      .within(() => {
        cy.get('[data-testid="VisibilityIcon"]').click();
      });
    
    cy.get('[role="dialog"] [data-testid="CloseIcon"]', { timeout: 5000 }).click();
    cy.get('[role="dialog"]').should('not.exist');
  });
});
