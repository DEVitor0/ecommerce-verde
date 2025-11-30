import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface BlogListProps {
  children: ReactNode;
}

// Container for blog cards - horizontal layout matching legacy
export function BlogList({ children }: BlogListProps) {
  return (
    <Box 
      sx={{ 
        width: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box 
        sx={{ 
          width: '80%',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          mt: '3vh'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
