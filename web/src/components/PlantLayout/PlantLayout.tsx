import { Box, Typography } from '@mui/material';

// Plant layout grid with category images
export function PlantLayout() {
  const categories = [
    { id: 'planta1', label: 'Tamanhos', image: '/assets/img/vasos/filtros-plantas/planta1.jpg' },
    { id: 'planta2', label: 'Estética', image: '/assets/img/vasos/filtros-plantas/planta3.jpg' },
    { id: 'planta3', label: 'Simplicidade', image: '/assets/img/vasos/filtros-plantas/planta2.png' },
    { id: 'planta4', label: 'Para Escritório', image: '/assets/img/vasos/filtros-plantas/planta4.jpg' },
    { id: 'planta5', label: 'Decorativas', image: '/assets/img/vasos/filtros-plantas/planta5.jpg' },
  ];

  return (
    <Box 
      sx={{ 
        width: { xs: '90%', md: '90%', lg: '88%', xl: '85%' },
        maxWidth: '1400px',
        margin: '20px auto 50px',
        padding: '0 20px',
      }}
    >
      {/* Grid masonry style */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: { xs: 'repeat(2, 200px)', md: 'repeat(2, 240px)', lg: 'repeat(2, 260px)' },
          gap: '15px',
        }}
      >
        {/* Tamanhos - ocupa 2 linhas e 1 coluna */}
        <Box
          sx={{
            gridColumn: '1 / 2',
            gridRow: '1 / 3',
            backgroundImage: `url(${categories[0].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 50%)',
            }
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: 20,
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              color: 'white',
              textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
              m: 2.5,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {categories[0].label}
          </Typography>
        </Box>

        {/* Estética - menor, ocupa menos colunas na linha 1 */}
        <Box
          sx={{
            gridColumn: '2 / 3',
            gridRow: '1 / 2',
            backgroundImage: `url(${categories[1].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 50%)',
            }
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: 20,
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              color: 'white',
              textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
              m: 2.5,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {categories[1].label}
          </Typography>
        </Box>

        {/* Simplicidade - maior, ocupa 2 colunas na linha 1 */}
        <Box
          sx={{
            gridColumn: '3 / 5',
            gridRow: '1 / 2',
            backgroundImage: `url(${categories[2].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 50%)',
            }
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: 20,
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              color: 'white',
              textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
              m: 2.5,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {categories[2].label}
          </Typography>
        </Box>

        {/* Para Escritório - maior, ocupa 2 colunas na linha 2 */}
        <Box
          sx={{
            gridColumn: '2 / 4',
            gridRow: '2 / 3',
            backgroundImage: `url(${categories[3].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 50%)',
            }
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: 20,
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              color: 'white',
              textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
              m: 2.5,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {categories[3].label}
          </Typography>
        </Box>

        {/* Decorativas - menor, ocupa 1 coluna na linha 2 */}
        <Box
          sx={{
            gridColumn: '4 / 5',
            gridRow: '2 / 3',
            backgroundImage: `url(${categories[4].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 50%)',
            }
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: 20,
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              color: 'white',
              textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
              m: 2.5,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {categories[4].label}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
