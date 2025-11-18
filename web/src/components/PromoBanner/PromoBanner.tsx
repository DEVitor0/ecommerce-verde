import { Box, Typography, Paper } from '@mui/material';

// Promotional banner section with images and center text
export function PromoBanner() {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'relative',
        my: 4
      }}
    >
      {/* Left image */}
      <Box 
        sx={{ 
          width: { xs: '70%', md: '40vw' }, 
          height: { xs: 300, md: '50vh' },
          backgroundImage: 'url(/src/assets/img/fundos/pexels-cottonbro-studio-4503263.jpg)',
          backgroundSize: 'cover',
          m: '30px 20px'
        }} 
      />
      
      {/* Center promo box */}
      <Paper 
        elevation={0}
        sx={{ 
          position: 'absolute',
          width: { xs: '80%', md: '20vw' },
          height: 150,
          p: 2,
          border: '2px solid white',
          bgcolor: 'transparent'
        }}
      >
        <Box 
          sx={{ 
            width: '100%', 
            height: '100%', 
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant="h3" sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: 35 }}>
            PROMOÇÃO
          </Typography>
          <Typography variant="h5" sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: 25, mb: 0.5 }}>
            <Box component="span" sx={{ color: 'primary.dark' }}>40%</Box> OFF
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 15 }}>
            NOVOS PRODUTOS EM BREVE!
          </Typography>
        </Box>
      </Paper>
      
      {/* Right image */}
      <Box 
        sx={{ 
          width: { xs: '70%', md: '40vw' }, 
          height: { xs: 300, md: '50vh' },
          backgroundImage: 'url(/src/assets/img/fundos/pexels-cottonbro-studio-4505171.jpg)',
          backgroundSize: 'cover',
          m: '30px 20px'
        }} 
      />
    </Box>
  );
}
