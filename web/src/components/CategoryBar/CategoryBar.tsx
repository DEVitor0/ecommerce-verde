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
      sx={{ 
        width: 120,
        height: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => setActiveCategory(category)}
          sx={{ 
            py: 0.5,
            px: 2,
            color: activeCategory === category ? 'primary.dark' : 'text.primary',
            textAlign: 'left',
            justifyContent: 'flex-start',
            '&:hover': {
              color: 'primary.main'
            }
          }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
}
