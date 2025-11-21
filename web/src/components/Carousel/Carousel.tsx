'use client';

import { Box } from '@mui/material';
import { useState, useEffect } from 'react';

export function Carousel() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      id="carrossel-inicio"
      sx={{
        width: '100%',
        height: '67vh',
        backgroundImage: 'url(/assets/img/fundos/picture-frame-leaning-against-white-wall.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Box
        id="titulo-carrossel"
        className={isVisible ? 'slideAnimation' : ''}
        sx={{
          marginBottom: '10vh',
          marginLeft: '8vw',
          opacity: isVisible ? 1 : 0,
          animation: isVisible ? 'slideParaEsquerda 1.5s ease forwards' : 'none',
          '@keyframes slideParaEsquerda': {
            from: {
              transform: 'translateX(-100%)',
              opacity: 0,
            },
            to: {
              transform: 'translateX(0)',
              opacity: 1,
            },
          },
        }}
      >
        <Box>
          <Box
            component="p"
            sx={{
              fontFamily: "'Mali', cursive, 'Helvetica Neue', sans-serif !important",
              fontSize: '6vh !important',
              color: '#518432 !important',
              margin: '0 !important',
              marginBottom: '10px !important',
              padding: '0 !important',
              lineHeight: '1 !important',
              height: 'auto !important',
            }}
          >
            35% OFF
          </Box>

          <Box
            component="h1"
            sx={{
              fontSize: '6.5vh !important',
              margin: '0 !important',
              padding: '0 !important',
              marginTop: '0px !important',
              marginBottom: '0px !important',
              lineHeight: '1 !important',
              height: 'auto !important',
              fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
            }}
          >
            Plantas Naturais
          </Box>

          <Box
            component="p"
            sx={{
              fontSize: '1.9vh !important',
              fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
              margin: '0 !important',
              padding: '0 !important',
              marginTop: '5px !important',
            }}
          >
            Lorem ipsum dolor provident, laboriosam ducimus vitae
          </Box>

          <Box
            sx={{
              width: '1px',
              height: '6vh',
              backgroundColor: '#646464',
              transform: 'translateX(3vw)',
              marginTop: '1.2vh',
            }}
          />

          <Box
            component="button"
            sx={{
              marginTop: '1.2vh',
              borderRadius: '30px',
              backgroundColor: '#518432 !important',
              padding: '10px',
              fontSize: '15px',
              color: 'white !important',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
              '&:hover': {
                backgroundColor: '#47941a !important',
              },
            }}
          >
            Comprar Agora
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
