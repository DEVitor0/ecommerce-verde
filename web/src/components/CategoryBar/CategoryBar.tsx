import { Box, Button } from '@mui/material';
import { useState } from 'react';

export function CategoryBar() {
  const [activeCategory, setActiveCategory] = useState('Plantas de Interior');
  
  const categories = [
    'Plantas de Interior',
    'Plantas de Exterior',
    'Plantas Decorativas',
    'Mudas e Sementes',
    'Plantas Tropicais',
  ];

  return (
    <Box 
      id="navegação-filtros"
      sx={{ 
        width: '120px !important',
        height: 'auto !important',
      }}
    >
      {categories.map((category, index) => (
        <Box
          component="button"
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`filtros-produtos ${index === 0 ? 'navegação-produtos' : ''}`}
          sx={{ 
            padding: '.5vw 2vh !important',
            color: activeCategory === category ? '#47941a !important' : '#242323 !important',
            textAlign: 'left !important',
            border: 'none !important',
            backgroundColor: 'transparent !important',
            cursor: 'pointer !important',
            fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif !important",
            fontSize: '15px !important',
            width: '100% !important',
            display: 'block !important',
            '&:hover': {
              color: '#518432 !important',
            }
          }}
        >
          {category}
        </Box>
      ))}
    </Box>
  );
}
