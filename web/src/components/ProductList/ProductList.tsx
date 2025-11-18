import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface ProductListProps {
  children: ReactNode;
}

// Container for product cards
export function ProductList({ children }: ProductListProps) {
  return (
    <Box 
      sx={{ 
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1
      }}
    >
      {children}
    </Box>
  );
}
