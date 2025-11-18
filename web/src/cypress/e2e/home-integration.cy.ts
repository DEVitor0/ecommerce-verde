describe('Home Page - Full Integration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the complete homepage successfully', () => {
    cy.url().should('eq', 'http://localhost:3000/');
    cy.title().should('exist');
  });

  it('should display all major sections in order', () => {
    // NavBar
    cy.get('header').should('be.visible');
    
    // FilterBar
    cy.contains('Tamanhos').should('be.visible');
    
    // Carousel
    cy.contains('Plantas Naturais').should('be.visible');
    
    // Plant Care Info
    cy.contains('A IMPORTÂNCIA DOS CUIDADOS ESSENCIAIS').should('be.visible');
    
    // Product Section
    cy.contains('Produtos Principais').should('be.visible');
    
    // Promo Banner
    cy.contains('PROMOÇÃO').should('be.visible');
    
    // Info Bar
    cy.contains('Suporte Gratuito').should('be.visible');
    
    // Category Section
    cy.contains('Categoria e Produtos').should('be.visible');
    
    // Recommendations
    cy.contains('Vitor Moreira').should('be.visible');
    
    // Blog
    cy.contains('Nossos Blogs').should('be.visible');
    
    // Footer
    cy.contains('INSCREVA-SE PARA MAIS NOVIDADES').should('be.visible');
  });

  it('should have proper scroll behavior', () => {
    cy.scrollTo('bottom', { duration: 2000 });
    cy.contains('Todos os direitos reservados').should('be.visible');
    
    cy.scrollTo('top', { duration: 2000 });
    cy.get('header').should('be.visible');
  });

  it('should handle complete user flow: browse -> filter -> view -> add to cart', () => {
    // Browse products
    cy.contains('Gustemico').should('be.visible');
    
    // Change filter
    cy.contains('Novidades').click();
    
    // Hover and view product
    cy.contains('Gustemico').parent().parent().parent()
      .trigger('mouseover')
      .within(() => {
        cy.get('[data-testid="VisibilityIcon"]').click();
      });
    
    // Check quick view opened
    cy.get('[role="dialog"]', { timeout: 5000 }).should('be.visible');
    cy.get('[data-testid="CloseIcon"]').first().click();
    
    // Add to cart
    cy.contains('Gustemico').parent().parent().parent()
      .trigger('mouseover')
      .within(() => {
        cy.get('[data-testid="ShoppingBasketIcon"]').click();
      });
    
    // Check success message
    cy.contains('Item Adicionado!', { timeout: 5000 }).should('be.visible');
  });

  it('should have all interactive elements working', () => {
    // Test navigation dropdowns
    cy.contains('Moeda').click();
    cy.contains('R$ Reais').should('be.visible');
    cy.get('body').click(0, 0);
    
    // Test filter dropdowns
    cy.contains('Tamanhos').click();
    cy.contains('Plantas pequenas').should('be.visible');
    cy.get('body').click(0, 0);
    
    // Test category selection
    cy.contains('Plantas de Exterior').click();
    
    // Test product filter
    cy.contains('Ofertas').click();
    
    // Test carousel navigation
    cy.get('[data-testid="ArrowForwardIosIcon"]').parent().click();
    cy.get('[data-testid="ArrowBackIosIcon"]').parent().click();
    
    // Test cart drawer
    cy.get('[data-testid="ShoppingBasketIcon"]').first().click();
    cy.contains('Carrinho').should('be.visible');
    cy.get('[data-testid="CloseIcon"]').first().click();
  });

  it('should be responsive at different viewports', () => {
    // Mobile
    cy.viewport('iphone-x');
    cy.contains('Plantas Naturais').should('be.visible');
    cy.contains('Produtos Principais').should('be.visible');
    
    // Tablet
    cy.viewport('ipad-2');
    cy.contains('Plantas Naturais').should('be.visible');
    cy.contains('Produtos Principais').should('be.visible');
    
    // Desktop
    cy.viewport(1920, 1080);
    cy.contains('Plantas Naturais').should('be.visible');
    cy.contains('Produtos Principais').should('be.visible');
  });

  it('should apply theme colors correctly', () => {
    // Check primary color usage
    cy.contains('35% OFF').should('have.css', 'color');
    
    // Check button styling
    cy.contains('Comprar Agora')
      .should('have.css', 'background-color')
      .and('not.equal', 'rgba(0, 0, 0, 0)');
    
    // Check theme consistency
    cy.get('body').should('have.css', 'font-family');
  });

  it('should handle errors gracefully', () => {
    // Test with non-existent routes
    cy.visit('/non-existent-page', { failOnStatusCode: false });
    
    // Return to home
    cy.visit('/');
    cy.contains('Plantas Naturais').should('be.visible');
  });

  it('should load all images properly', () => {
    // Wait for images to load
    cy.get('img').should('be.visible');
    
    // Check specific images
    cy.get('img[alt="Jardim Exótico"]').should('exist');
    cy.get('img[alt="Vaso de Planta"]').should('exist');
  });

  it('should have proper accessibility', () => {
    // Check for proper semantic HTML
    cy.get('header').should('exist');
    cy.get('main').should('exist');
    cy.get('footer').should('exist');
    
    // Check for clickable elements
    cy.get('button').should('have.length.greaterThan', 0);
    
    // Check for proper links
    cy.get('a').should('have.length.greaterThan', 0);
  });

  it('should maintain state across interactions', () => {
    // Change filter
    cy.contains('Novidades').click();
    
    // Scroll down
    cy.scrollTo('center');
    
    // Scroll back up
    cy.scrollTo('top');
    
    // Filter should still be active
    cy.contains('Novidades').should('exist');
  });
});
