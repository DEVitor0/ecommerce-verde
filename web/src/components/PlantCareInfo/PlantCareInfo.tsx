'use client';

import { Box } from '@mui/material';

export function PlantCareInfo() {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '40px 20px 0px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: '30px',
      }}
    >
      <Box
        component="h2"
        sx={{
          fontFamily: "'Montserrat', sans-serif !important",
          fontSize: { xs: '28px', md: '36px' },
          fontWeight: '600 !important',
          color: '#000000 !important',
          margin: '0 !important',
          marginBottom: '8px !important',
          lineHeight: '1.2 !important',
          textAlign: 'center',
        }}
      >
        Explore Nossas Plantas
      </Box>

      <Box
        component="p"
        sx={{
          fontFamily: "'Montserrat', sans-serif !important",
          fontSize: { xs: '18px', md: '22px' },
          fontWeight: '300 !important',
          color: '#518432 !important',
          margin: '0 !important',
          marginBottom: '12px !important',
          textAlign: 'center',
          letterSpacing: '0.5px',
        }}
      >
        Encontre a planta ideal para cada ambiente
      </Box>

      <Box
        sx={{
          width: '80px',
          height: '2px',
          backgroundColor: '#47941a',
          borderRadius: '1px',
          marginBottom: '15px',
        }}
      />
    </Box>
  );
}
