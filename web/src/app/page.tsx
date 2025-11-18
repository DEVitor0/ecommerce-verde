'use client';

import { Box, Container } from '@mui/material';
import { useState } from 'react';
import {
  PlantCareInfo,
  PlantLayout,
  SectionTitle,
  ProductFilter,
  ProductList,
  ProductCard,
  CarouselControls,
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

  // Mock data for demonstration
  const products = [
    { id: 1, name: 'Gustemico', price: 48.00, originalPrice: 80.00, discount: 40, image: '/src/assets/img/vasos/produtos-principais/plantaxx.png' },
    { id: 2, name: 'Sapuyla', price: 20.00, originalPrice: 66.00, discount: 70, image: '/src/assets/img/vasos/produtos-principais/yunn.png' },
    { id: 3, name: 'Mollapoza', price: 40.00, image: '/src/assets/img/vasos/produtos-principais/planat12-removebg-preview.png' },
    { id: 4, name: 'Begônia', price: 73.00, image: '/src/assets/img/vasos/produtos-principais/planta8.png' },
    { id: 5, name: 'Yamullat', price: 25.00, image: '/src/assets/img/vasos/produtos-principais/planta12.png' },
  ];

  const recommendations = [
    {
      name: 'Vitor Moreira',
      role: 'Cliente',
      message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate enim possimus porro laudantium libero repellat provident dolores Doloribus ad, consectetur velit dolor voluptates molestias harum debitis ratione.',
      image: '/src/assets/img/pessoas/pessoa1.jpg',
    },
    {
      name: 'Maria Silva',
      role: 'Cliente',
      message: 'Excelente serviço e produtos de qualidade. Recomendo para todos que buscam plantas saudáveis e bonitas.',
      image: '/src/assets/img/pessoas/pessoa2.jpg',
    },
  ];

  const blogs = [
    {
      title: 'Alguns Segredos de Beleza e Resistência para plantas',
      excerpt: 'Aenean porta magna, sed odio placerat vehicula feugiat mattis. pretium justo eget luctus ...',
      date: '18 Mar, 2024',
      image: '/src/assets/img/fundos/fundo3-blog.jpeg',
    },
    {
      title: 'Detalhes que afetam o desenvolvimento das plantas',
      excerpt: 'Viver augue vitae, est eros vehicula tincidunt pulvinar. In, dictum magna sed eros ...',
      date: '23 Fev, 2024',
      image: '/src/assets/img/fundos/fundo2-blog.jpeg',
    },
  ];

  const handleQuickView = (product: any) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Navigation */}

      {/* Main content */}
      <Container maxWidth={false} disableGutters>
        {/* Hero carousel */}

        {/* Plant care section */}
        <PlantCareInfo />

        {/* Plant layout grid */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <PlantLayout />
        </Box>

        {/* Products section */}
        <SectionTitle title="Produtos Principais" subtitle="Os melhores produtos" />
        <ProductFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        
        <ProductList>
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
        </ProductList>

        <CarouselControls onPrevious={() => {}} onNext={() => {}} />

        {/* Promo banner */}
        <PromoBanner />

        {/* Info bar */}
        <InfoBar />

        {/* Category section */}
        <SectionTitle title="Categoria e Produtos" subtitle="Descubra, Explore e Surpreenda-se" />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 4 }}>
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

        {/* Recommendations */}
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

      {/* Modals and drawers */}
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
