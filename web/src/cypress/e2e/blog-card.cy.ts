describe('BlogCard Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display blog cards', () => {
    cy.contains('Alguns Segredos de Beleza').should('be.visible');
    cy.contains('Detalhes que afetam o desenvolvimento').should('be.visible');
  });

  it('should display blog dates', () => {
    cy.contains('18 Mar, 2024').should('be.visible');
    cy.contains('23 Fev, 2024').should('be.visible');
  });

  it('should display blog excerpts', () => {
    cy.contains('Aenean porta magna').should('be.visible');
    cy.contains('Viver augue vitae').should('be.visible');
  });

  it('should display calendar icons', () => {
    cy.get('[data-testid="CalendarMonthIcon"]').should('be.visible');
  });

  it('should display "LER MAIS" buttons', () => {
    cy.contains('LER MAIS').should('be.visible');
  });

  it('should have blog images', () => {
    cy.get('div[style*="background-image"]').should('exist');
  });

  it('should style "LER MAIS" button correctly', () => {
    cy.contains('LER MAIS')
      .should('have.css', 'border-radius');
  });
});
