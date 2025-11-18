import { Box, Typography } from '@mui/material';

// Plant layout grid with category images
export function PlantLayout() {
  const categories = [
    { id: 'planta1', label: 'Tamanhos', image: '/src/assets/img/vasos/filtros-plantas/planta1.jpg', area: 'a', height: '56vh', width: '32vw' },
    { id: 'planta2', label: 'Estética', image: '/src/assets/img/vasos/filtros-plantas/planta3.jpg', area: 'b', height: '25vh', width: '24vw' },
    { id: 'planta3', label: 'Simplicidade', image: '/src/assets/img/vasos/filtros-plantas/planta2.jpg', area: 'c', height: '25vh', width: '22vw' },
    { id: 'planta4', label: 'Para Escritório', image: '/src/assets/img/vasos/filtros-plantas/planta4.jpg', area: 'd', height: '28vh', width: '27vw' },
    { id: 'planta5', label: 'Decorativas', image: '/src/assets/img/vasos/filtros-plantas/planta5.jpg', area: 'e', height: '28vh', width: '20vw' },
  ];

  return (
    <Box 
      sx={{ 
        display: 'grid',
        gridTemplateAreas: `
          "a b c"
          "a d e"
        `,
        width: '75%',
        height: 'auto',
        placeItems: 'center',
        gap: 1.25
      }}
    >
      {categories.map((category) => (
        <Box
          key={category.id}
          sx={{
            gridArea: category.area,
            width: category.width,
            height: category.height,
            backgroundImage: `url(${category.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)'
            }
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: 18,
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 300,
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              m: 2
            }}
          >
            {category.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
