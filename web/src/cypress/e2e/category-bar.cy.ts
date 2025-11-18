describe('CategoryBar Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display all category options', () => {
    cy.contains('Plantas de Interior').should('be.visible');
    cy.contains('Plantas de Exterior').should('be.visible');
    cy.contains('Plantas Decorativas').should('be.visible');
    cy.contains('Mudas e Sementes').should('be.visible');
    cy.contains('Plantas Tropicais').should('be.visible');
  });

  it('should highlight active category', () => {
    cy.contains('Plantas de Interior')
      .should('have.css', 'color');
  });

  it('should change active category on click', () => {
    cy.contains('Plantas de Exterior').click();
    cy.contains('Plantas de Exterior')
      .should('have.css', 'color');
  });

  it('should be displayed as a vertical list', () => {
    cy.contains('Plantas de Interior').parent()
      .should('have.css', 'flex-direction', 'column');
  });

  it('should align text to the left', () => {
    cy.contains('Plantas de Interior')
      .should('have.css', 'text-align', 'left');
  });
});
