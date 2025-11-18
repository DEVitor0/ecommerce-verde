describe('PlantCareInfo Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display plant care section', () => {
    cy.contains('A IMPORTÂNCIA DOS CUIDADOS ESSENCIAIS').should('be.visible');
  });

  it('should display plant icon', () => {
    cy.get('img[alt="Vaso de Planta"]').should('exist');
  });

  it('should display description text', () => {
    cy.contains('Lorem ipsum dolor sit amet consectetur').should('be.visible');
  });

  it('should display "Ler Mais" button', () => {
    cy.contains('Ler Mais').should('be.visible');
  });

  it('should center content', () => {
    cy.contains('A IMPORTÂNCIA DOS CUIDADOS ESSENCIAIS').parent()
      .should('have.css', 'text-align', 'center');
  });

  it('should have proper button styling', () => {
    cy.contains('Ler Mais')
      .should('have.css', 'border-radius');
  });
});
