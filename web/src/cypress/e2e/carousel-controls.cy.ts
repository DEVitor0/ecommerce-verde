describe('CarouselControls Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display carousel navigation arrows', () => {
    cy.get('[data-testid="ArrowBackIosIcon"]').should('be.visible');
    cy.get('[data-testid="ArrowForwardIosIcon"]').should('be.visible');
  });

  it('should position arrows correctly', () => {
    cy.get('[data-testid="ArrowBackIosIcon"]').parent().parent()
      .should('have.css', 'display', 'flex')
      .and('have.css', 'justify-content', 'center');
  });

  it('should have circular button styling', () => {
    cy.get('[data-testid="ArrowBackIosIcon"]').parent()
      .should('have.css', 'border-radius');
  });

  it('should be clickable', () => {
    cy.get('[data-testid="ArrowBackIosIcon"]').parent().click();
    cy.get('[data-testid="ArrowForwardIosIcon"]').parent().click();
  });
});
