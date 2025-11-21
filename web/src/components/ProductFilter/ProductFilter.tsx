'use client';

import { Box } from '@mui/material';

interface ProductFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ProductFilter({ activeFilter, onFilterChange }: ProductFilterProps) {
  const filters = [
    { id: 'populares', label: 'Populares' },
    { id: 'novidades', label: 'Novidades' },
    { id: 'ofertas', label: 'Ofertas' },
  ];

  return (
    <Box 
      sx={{ 
        width: '100% !important',
        display: 'flex !important',
        justifyContent: 'center !important',
        alignItems: 'center !important',
        gap: '4vw !important',
        marginTop: '1.5vh !important',
        marginBottom: '1.5vh !important',
      }}
    >
      {filters.map((filter) => (
        <Box
          component="button"
          key={filter.id}
          id={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className="botões-limpos"
          sx={{
            border: 'none !important',
            fontSize: '18px !important',
            fontWeight: '400 !important',
            backgroundColor: 'white !important',
            cursor: 'pointer !important',
            color: activeFilter === filter.id ? '#518432 !important' : 'inherit !important',
            fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif !important",
            '&:hover': {
              color: '#518432 !important'
            }
          }}
        >
          {filter.label}
        </Box>
      ))}
    </Box>
  );
}
