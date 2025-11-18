import { Box, Button } from '@mui/material';

interface ProductFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

// Filter buttons for products (Popular, New, Sale)
export function ProductFilter({ activeFilter, onFilterChange }: ProductFilterProps) {
  const filters = [
    { id: 'popular', label: 'Populares' },
    { id: 'new', label: 'Novidades' },
    { id: 'sale', label: 'Ofertas' },
  ];

  return (
    <Box 
      sx={{ 
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4vw',
        mt: 1.5,
        mb: 1.5
      }}
    >
      {filters.map((filter) => (
        <Button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          sx={{
            fontSize: 18,
            color: activeFilter === filter.id ? 'primary.main' : 'text.primary',
            fontWeight: activeFilter === filter.id ? 600 : 400,
            '&:hover': {
              color: 'primary.main'
            }
          }}
        >
          {filter.label}
        </Button>
      ))}
    </Box>
  );
}
