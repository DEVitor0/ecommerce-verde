'use client';

import { Box } from '@mui/material';
import { ReactNode, Children } from 'react';

interface ProductListProps {
  children: ReactNode;
}

export function ProductList({ children }: ProductListProps) {
  const childrenArray = Children.toArray(children);
  const firstRow = childrenArray.slice(0, 5);
  const secondRow = childrenArray.slice(5, 10);

  return (
    <Box 
      id="seção-produtos"
      sx={{ 
        width: '100% !important',
        height: 'auto !important',
        display: 'grid !important',
        justifyItems: 'center !important',
      }}
    >
      <Box
        className="container-plantas container-populares"
        sx={{
          width: '100% !important',
          height: 'auto !important',
          display: 'flex !important',
          justifyContent: 'center !important',
          alignItems: 'center !important',
          flexWrap: 'wrap !important',
        }}
      >
        {firstRow}
      </Box>
      
      {secondRow.length > 0 && (
        <Box
          className="container-plantas container-populares"
          sx={{
            width: '100% !important',
            height: 'auto !important',
            display: 'flex !important',
            justifyContent: 'center !important',
            alignItems: 'center !important',
            flexWrap: 'wrap !important',
          }}
        >
          {secondRow}
        </Box>
      )}
    </Box>
  );
}
