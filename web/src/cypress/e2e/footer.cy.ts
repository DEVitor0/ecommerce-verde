describe('Footer Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display newsletter section', () => {
    cy.contains('INSCREVA-SE PARA MAIS NOVIDADES').should('be.visible');
    cy.get('input[placeholder="Insira Seu Email Aqui"]').should('be.visible');
    cy.contains('button', 'Enviar').should('be.visible');
  });

  it('should display footer sections', () => {
    cy.contains('Links Rápidos').should('be.visible');
    cy.contains('Contato').should('be.visible');
    cy.contains('Redes Sociais').should('be.visible');
  });

  it('should display quick links', () => {
    cy.contains('Home').should('be.visible');
    cy.contains('Promoções').should('be.visible');
    cy.contains('Blog').should('be.visible');
  });

  it('should display contact information', () => {
    cy.contains('Rua Exemplo, 123, Cidade, País').should('be.visible');
    cy.contains('+55 123 456 7890').should('be.visible');
    cy.contains('contato@empresa.com').should('be.visible');
  });

  it('should display social media icons', () => {
    cy.get('[data-testid="YouTubeIcon"]').should('be.visible');
    cy.get('[data-testid="FacebookIcon"]').should('be.visible');
    cy.get('[data-testid="InstagramIcon"]').should('be.visible');
    cy.get('[data-testid="LinkedInIcon"]').should('be.visible');
  });

  it('should display copyright information', () => {
    cy.contains('© 2024 Jardim Exótico | Todos os direitos reservados').should('be.visible');
  });

  it('should have proper border styling', () => {
    cy.contains('Links Rápidos').parent().parent()
      .should('have.css', 'border-top');
  });
});
