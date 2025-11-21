'use client';

import { Box } from '@mui/material';

export function PromoBanner() {
  return (
    <Box 
      id="promoção"
      sx={{ 
        width: '100% !important', 
        height: 'auto !important',
        display: 'flex !important', 
        justifyContent: 'center !important', 
        alignItems: 'center !important',
        position: 'relative !important',
      }}
    >
      <Box 
        className="imagens-promoção"
        sx={{ 
          width: '40vw !important', 
          height: '50vh !important',
          backgroundImage: 'url(/assets/img/fundos/pexels-cottonbro-studio-4503263.jpg) !important',
          backgroundSize: 'cover !important',
          margin: '30px 20px !important',
        }} 
      />
      
      <Box 
        id="container-promoção"
        sx={{ 
          width: '23vw !important',
          minWidth: '350px !important',
          height: '200px !important',
          padding: '20px !important',
          border: '2px solid white !important',
          position: 'absolute !important',
        }}
      >
        <Box 
          sx={{ 
            width: '100% !important', 
            height: '100% !important', 
            backgroundColor: 'white !important',
            display: 'flex !important',
            justifyContent: 'center !important',
            alignItems: 'center !important',
            flexDirection: 'column !important',
            padding: '45px 35px !important',
            whiteSpace: 'nowrap !important',
          }}
        >
          <Box 
            component="h3"
            sx={{ 
              fontFamily: 'Montserrat, sans-serif !important', 
              fontSize: '35px !important', 
              fontWeight: '700 !important',
              margin: '0 !important',
            }}
          >
            PROMOÇÃO
          </Box>
          <Box 
            component="p"
            sx={{ 
              fontFamily: 'Montserrat, sans-serif !important', 
              fontSize: '25px !important', 
              fontWeight: '300 !important',
              marginBottom: '0.5vh !important',
              margin: '0 !important',
            }}
          >
            <Box 
              component="span" 
              sx={{ 
                fontFamily: 'Montserrat, sans-serif !important',
                fontSize: '25px !important',
                color: '#518432 !important',
              }}
            >
              40%
            </Box> OFF
          </Box>
          <Box 
            component="p"
            sx={{ 
              fontSize: '15px !important',
              margin: '0 !important',
              fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif !important",
              fontWeight: '450 !important',
            }}
          >
            NOVOS PRODUTOS EM BREVE!
          </Box>
        </Box>
      </Box>
      
      <Box 
        className="imagens-promoção"
        sx={{ 
          width: '40vw !important', 
          height: '50vh !important',
          backgroundImage: 'url(/assets/img/fundos/pexels-cottonbro-studio-4505171.jpg) !important',
          backgroundSize: 'cover !important',
          margin: '30px 20px !important',
        }} 
      />
    </Box>
  );
}
