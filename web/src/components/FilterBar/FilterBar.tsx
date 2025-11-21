'use client';

import { Box } from '@mui/material';
import { useState } from 'react';

export function FilterBar() {
  const [sizesOpen, setSizesOpen] = useState(false);
  const [pricesOpen, setPricesOpen] = useState(false);

  return (
    <Box
      component="nav"
      className="filtragem-planta"
      sx={{
        marginTop: '25px',
        width: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
      }}
    >
      {/* Tamanhos */}
      <Box sx={{ position: 'relative' }}>
        <Box
          className="clicavel abertura"
          onClick={() => setSizesOpen(!sizesOpen)}
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <Box
            component="button"
            className="botão-abertura"
            sx={{
              border: 'none',
              fontSize: '15px',
              fontWeight: 400,
              backgroundColor: 'white',
              cursor: 'pointer',
              fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
            }}
          >
            Tamanhos
          </Box>
          <Box component="i" className="fa-solid fa-angle-down" sx={{ ml: 0.5 }} />
        </Box>
        <Box
          className="container-abertura"
          sx={{
            position: 'absolute',
            display: sizesOpen ? 'flex' : 'none',
            flexDirection: 'column',
            marginTop: '24px',
            padding: '5px 15px 5px 5px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'white',
            borderBottom: '2px solid #47941a',
            gap: '2px',
            animation: 'abrindo 0.3s ease',
            minWidth: '210px',
            width: 'auto',
            '@keyframes abrindo': {
              from: {
                opacity: 0,
                transform: 'translateY(-20px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
            zIndex: 10,
          }}
        >
          <Box
            component="button"
            onClick={() => setSizesOpen(false)}
            sx={{
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '15px',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
              whiteSpace: 'nowrap',
              padding: '0',
            }}
          >
            Plantas pequenas
          </Box>
          <Box
            component="button"
            onClick={() => setSizesOpen(false)}
            sx={{
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '15px',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
              whiteSpace: 'nowrap',
              padding: '0',
            }}
          >
            Plantas médias
          </Box>
          <Box
            component="button"
            onClick={() => setPricesOpen(false)}
            sx={{
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '15px',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
              whiteSpace: 'nowrap',
              padding: '0',
            }}
          >
            Todas as faixas de preço
          </Box>
        </Box>
      </Box>

      {/* Preços */}
      <Box sx={{ position: 'relative' }}>
        <Box
          className="clicavel abertura"
          onClick={() => setPricesOpen(!pricesOpen)}
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <Box
            component="button"
            className="botões-limpos"
            sx={{
              border: 'none',
              fontSize: '15px',
              fontWeight: 400,
              backgroundColor: 'white',
              cursor: 'pointer',
              fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
            }}
          >
            Preços
          </Box>
          <Box component="i" className="fa-solid fa-angle-down" sx={{ ml: 0.5 }} />
        </Box>
        <Box
          className="container-abertura"
          sx={{
            position: 'absolute',
            display: pricesOpen ? 'flex' : 'none',
            flexDirection: 'column',
            marginTop: '24px',
            padding: '5px 15px 5px 5px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'white',
            borderBottom: '2px solid #47941a',
            gap: '2px',
            animation: 'abrindo 0.3s ease',
            minWidth: '260px',
            width: 'auto',
            '@keyframes abrindo': {
              from: {
                opacity: 0,
                transform: 'translateY(-20px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
            zIndex: 10,
          }}
        >
          <Box
            component="button"
            className="botões-limpos"
            onClick={() => setPricesOpen(false)}
            sx={{
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '15px',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
              whiteSpace: 'nowrap',
              padding: '2px 0',
            }}
          >
            Por menos de R$ 20,00
          </Box>
          <Box
            component="button"
            className="botões-limpos"
            onClick={() => setPricesOpen(false)}
            sx={{
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '15px',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
              whiteSpace: 'nowrap',
              padding: '2px 0',
            }}
          >
            Entre R$ 20,00 e R$ 30,00
          </Box>
          <Box
            component="button"
            className="botões-limpos"
            onClick={() => setPricesOpen(false)}
            sx={{
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '15px',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
              whiteSpace: 'nowrap',
              padding: '2px 0',
            }}
          >
            Entre R$ 30,00 e R$ 40,00
          </Box>
          <Box
            component="button"
            className="botões-limpos"
            onClick={() => setPricesOpen(false)}
            sx={{
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '15px',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
              whiteSpace: 'nowrap',
              padding: '0',
            }}
          >
            Entre R$ 40,00 e R$ 50,00
          </Box>
          <Box
            component="button"
            onClick={() => setPricesOpen(false)}
            sx={{
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '15px',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
              whiteSpace: 'nowrap',
              padding: '0',
            }}
          >
            Acima de R$ 200,00
          </Box>
        </Box>
      </Box>

      {/* Decoração */}
      <Box>
        <Box
          component="button"
          className="botões-limpos"
          sx={{
            border: 'none',
            fontSize: '15px',
            fontWeight: 400,
            backgroundColor: 'white',
            cursor: 'pointer',
            fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
          }}
        >
          Decoração
        </Box>
      </Box>

      {/* Flores */}
      <Box>
        <Box
          component="button"
          className="botões-limpos"
          sx={{
            border: 'none',
            fontSize: '15px',
            fontWeight: 400,
            backgroundColor: 'white',
            cursor: 'pointer',
            fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
          }}
        >
          Flores
        </Box>
      </Box>

      {/* Vasos & Mudas */}
      <Box>
        <Box
          component="button"
          className="botões-limpos"
          sx={{
            border: 'none',
            fontSize: '15px',
            fontWeight: 400,
            backgroundColor: 'white',
            cursor: 'pointer',
            fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
          }}
        >
          Vasos & Mudas
        </Box>
      </Box>
    </Box>
  );
}
