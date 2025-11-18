import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface BlogListProps {
  children: ReactNode;
}

// Container for blog cards
export function BlogList({ children }: BlogListProps) {
  return (
    <Box 
      sx={{ 
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 3
      }}
    >
      <Box 
        sx={{ 
          width: { xs: '100%', md: '80%' },
          display: 'flex',
          justifyContent: { xs: 'flex-start', md: 'center' },
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
