'use client';

import { Box, Container } from '@mui/material';
import { useState } from 'react';
import {
  NavBar,
  FilterBar,
  Carousel,
  PlantCareInfo,
  PlantLayout,
  SectionTitle,
  ProductFilter,
  ProductCard,
  ProductList,
  ProductCarousel,
  PromoBanner,
  InfoBar,
  CategoryBar,
  Recommendation,
  BlogList,
  BlogCard,
  Cart,
  MessageModal,
  ProductQuickView,
  Footer,
} from '@/components';

export default function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('popular');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = [
    { id: 1, name: 'Gustemico', price: 48.00, originalPrice: 80.00, discount: 40, image: '/assets/img/vasos/produtos-principais/plantaxx.png' },
    { id: 2, name: 'Sapuyla', price: 20.00, originalPrice: 66.00, discount: 70, image: '/assets/img/vasos/produtos-principais/yunn.png' },
    { id: 3, name: 'Mollapoza', price: 40.00, image: '/assets/img/vasos/produtos-principais/planat12-removebg-preview.png' },
    { id: 4, name: 'Begônia', price: 73.00, image: '/assets/img/vasos/produtos-principais/planta8.png' },
    { id: 5, name: 'Yamullat', price: 25.00, image: '/assets/img/vasos/produtos-principais/planta12.png' },
    { id: 6, name: 'Magnólia', price: 77.00, image: '/assets/img/vasos/produtos-principais/plantaxxx-removebg-preview.png' },
    { id: 7, name: 'Muzbbestie', price: 30.00, originalPrice: 60.00, discount: 50, image: '/assets/img/vasos/produtos-principais/plantinha.png' },
    { id: 8, name: 'Yekutsa', price: 90.00, originalPrice: 100.00, discount: 10, image: '/assets/img/vasos/produtos-principais/plantax.png' },
    { id: 9, name: 'Buedevillo', price: 35.00, image: '/assets/img/vasos/produtos-principais/planta4.png' },
    { id: 10, name: 'Crisântemo', price: 30.00, image: '/assets/img/vasos/produtos-principais/planta11.webp' },
  ];

  const recommendations = [
    {
      name: 'Carlos Oliveira',
      role: 'Cliente',
      message: 'Vivamus a finibus ac ipsum porttitor egestas ut sit amet nulla. Nunc facilisis ipsum ut nisl tempus, non feugiat justo semper. Vestibul ac justo justo. Proin pharetra, purus non vehicula sagittis, nunc varius porttitor ligula, in volutpat justo. ...',
      image: '/assets/img/pessoas/pessoa3.jpg',
    },
    {
      name: 'João Santos',
      role: 'Cliente',
      message: 'Integer a semper ac purus ultrices dictum ut sit amet massa. Donec elementum purus ut ante blandit, non posuere justo viverra. Aliquam ac justo justo. Nulla facilisi, velit non posuere cursus, nunc tellus ultrices sodales, in eleifend justo. ...',
      image: '/assets/img/pessoas/pessoa2.jpg',
    },
    {
      name: 'Maria Silva',
      role: 'Cliente',
      message: 'Quisque a tempus ac magna gravida pretium ut sit eros magna. Fusce suscipit magna ut elit gravida, non volutpat justo semper. Aliquam ac justo justo. Nam dictumst, lorem non convallis elementum, nunc tellus gravida lectus, in lobortis ipsum. ...',
      image: '/assets/img/pessoas/pessoa1.jpg',
    },
  ];

  const blogs = [
    {
      title: 'Alguns Segredos de Beleza e Resistência para plantas',
      excerpt: 'Aenean porta magna, sed odio placerat vehicula feugiat mattis. pretium justo eget luctus ...',
      date: '18 Mar, 2024',
      image: '/assets/img/fundos/fundo3-blog.jpeg',
    },
    {
      title: 'Detalhes que afetam o desenvolvimento das plantas',
      excerpt: 'Viver augue vitae, est eros vehicula tincidunt pulvinar. In, dictum magna sed eros ...',
      date: '23 Fev, 2024',
      image: '/assets/img/fundos/fundo2-blog.jpeg',
    },
  ];

  const handleQuickView = (product: any) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <NavBar 
        onCartOpen={() => setCartOpen(true)}
        onLoginClick={() => console.log('Login clicked')}
        onFavoriteClick={() => console.log('Favorite clicked')}
      />

      <FilterBar />

      <Container maxWidth={false} disableGutters>
        <Carousel />

        <PlantCareInfo />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <PlantLayout />
        </Box>

        <SectionTitle title="Produtos Principais" subtitle="Os melhores produtos" />
        <ProductFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        
        <ProductCarousel>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={() => {
                setMessageModalOpen(true);
                setTimeout(() => setMessageModalOpen(false), 3000);
              }}
              onQuickView={() => handleQuickView(product)}
            />
          ))}
        </ProductCarousel>

        <PromoBanner />

        <InfoBar />

        <SectionTitle title="Categoria e Produtos" subtitle="Descubra, Explore e Surpreenda-se" />
        <Box 
          id="container-maior-categorias"
          sx={{ 
            width: '100% !important', 
            height: 'auto !important', 
            display: 'flex !important', 
            justifyContent: 'center !important', 
            alignItems: 'center !important', 
            marginBottom: '3vh !important', 
            marginTop: '3vh !important' 
          }}
        >
          <Box
            id="container-categorias"
            sx={{
              width: 'auto !important',
              height: 'auto !important',
              display: 'flex !important',
              alignItems: 'flex-start !important',
              justifyContent: 'center !important',
              gap: '20px !important',
            }}
          >
            <CategoryBar />
            <ProductList>
            {products.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={() => setCartOpen(true)}
                onQuickView={() => handleQuickView(product)}
              />
            ))}
          </ProductList>
          </Box>
        </Box>

        <Recommendation items={recommendations} />

        {/* Blog section */}
        <SectionTitle title="Nossos Blogs" subtitle="Confira Agora!" />
        <BlogList>
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </BlogList>
      </Container>

      {/* Footer */}
      <Footer />

      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
      <MessageModal
        open={messageModalOpen}
        onClose={() => setMessageModalOpen(false)}
        type="success"
        title="Item Adicionado!"
        message="Sua planta foi adicionada com sucesso ao carrinho"
      />
      <ProductQuickView
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        product={selectedProduct}
      />
    </Box>
  );
}
