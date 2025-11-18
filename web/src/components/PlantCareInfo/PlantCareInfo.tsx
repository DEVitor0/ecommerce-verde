import { Box, Typography, Button } from '@mui/material';

// Plant care info section
export function PlantCareInfo() {
  return (
    <Box 
      sx={{ 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 3
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Box 
          component="img" 
          src="/src/assets/img/icones/vaso-de-plantas.png" 
          alt="Vaso de Planta"
          sx={{ width: 100, height: 100 }}
        />
      </Box>
      
      <Typography 
        variant="h6" 
        sx={{ 
          textAlign: 'center',
          pt: 0.625,
          fontSize: 18,
          width: '100%'
        }}
      >
        A IMPORTÂNCIA DOS CUIDADOS ESSENCIAIS NA CULTIVAÇÃO DE PLANTAS SAUDÁVEIS
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          width: { xs: '90%', md: 1000 },
          textAlign: 'center',
          pt: 0.625
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur ullam minima rerum eius quisquam
        quaerat illo quis explicabo! Consequatur laborum ad nihil veritatis, molestias voluptatibus earum
        unde veniam neque aspernatur
      </Typography>
      
      <Button 
        variant="contained"
        color="primary"
        sx={{ 
          width: 150,
          height: 40,
          borderRadius: '30px',
          fontSize: 15,
          mt: 3
        }}
      >
        Ler Mais
      </Button>
    </Box>
  );
}
