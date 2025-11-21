'use client';

import { Box } from '@mui/material';
import { useState } from 'react';

interface NavBarProps {
  onCartOpen?: () => void;
  onLoginClick?: () => void;
  onFavoriteClick?: () => void;
}

export function NavBar({ onCartOpen, onLoginClick, onFavoriteClick }: NavBarProps) {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  return (
    <Box
      component="nav"
      id="menu-inicial-preferencias"
      sx={{
        width: '100%',
        height: '70px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottom: '0.2px solid #AAAAAA',
      }}
    >
      {/* Preferências Menu */}
      <Box
        className="preferencias-menu"
        sx={{
          width: '400px',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {/* Moeda */}
        <Box
          className="itens-preferencias"
          sx={{
            width: 'auto',
            height: 'auto',
            cursor: 'pointer',
            borderRight: '1px solid #AAAAAA',
            paddingRight: '20px',
            position: 'relative',
          }}
        >
          <Box
            className="abertura"
            onClick={() => setCurrencyOpen(!currencyOpen)}
            sx={{ display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}
          >
            <Box component="span" className="negrito" sx={{ fontWeight: 'bold', fontSize: '18px' }}>$</Box>
            <Box
              component="button"
              className="botão-abertura"
              sx={{
                border: 'none',
                backgroundColor: 'white',
                fontSize: '15px',
                cursor: 'pointer',
                fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
                padding: 0,
              }}
            >
              Moeda
            </Box>
            <Box component="i" className="fa-solid fa-angle-down" sx={{ cursor: 'pointer', fontSize: '14px' }} />
          </Box>
          <Box
            className="container-abertura"
            sx={{
              position: 'absolute',
              display: currencyOpen ? 'flex' : 'none',
              flexDirection: 'column',
              marginTop: '24px',
              padding: '5px 15px 5px 5px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              backgroundColor: 'white',
              borderBottom: '2px solid #47941a',
              gap: '2px',
              animation: 'abrindo 0.3s ease',
              minWidth: '140px',
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
            }}
          >
            <Box
              component="button"
              onClick={() => setCurrencyOpen(false)}
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
              R$ Reais
            </Box>
            <Box
              component="button"
              onClick={() => setCurrencyOpen(false)}
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
              $ Dollar
            </Box>
            <Box
              component="button"
              onClick={() => setCurrencyOpen(false)}
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
              € Euro
            </Box>
          </Box>
        </Box>

        {/* Idioma */}
        <Box
          className="itens-preferencias"
          sx={{
            width: 'auto',
            height: 'auto',
            cursor: 'pointer',
            borderRight: '1px solid #AAAAAA',
            paddingRight: '20px',
            position: 'relative',
          }}
        >
          <Box
            className="abertura"
            onClick={() => setLanguageOpen(!languageOpen)}
            sx={{ display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}
          >
            <Box component="span" sx={{ fontSize: '16px' }}>🇧🇷</Box>
            <Box
              component="button"
              className="botão-abertura"
              sx={{
                border: 'none',
                backgroundColor: 'white',
                fontSize: '15px',
                cursor: 'pointer',
                fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
                padding: 0,
              }}
            >
              Idioma
            </Box>
            <Box component="i" className="fa-solid fa-angle-down" sx={{ cursor: 'pointer', fontSize: '14px' }} />
          </Box>
          <Box
            className="container-abertura"
            sx={{
              position: 'absolute',
              display: languageOpen ? 'flex' : 'none',
              flexDirection: 'column',
              marginTop: '24px',
              padding: '5px 15px 5px 5px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              backgroundColor: 'white',
              borderBottom: '2px solid #47941a',
              gap: '2px',
              animation: 'abrindo 0.3s ease',
              minWidth: '140px',
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
            }}
          >
            <Box
              component="button"
              onClick={() => setLanguageOpen(false)}
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
              <span>🇧🇷</span> Brasil
            </Box>
            <Box
              component="button"
              onClick={() => setLanguageOpen(false)}
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
              <span>🇺🇸</span> USA
            </Box>
          </Box>
        </Box>

        {/* Telefone */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Box component="i" className="fa-solid fa-phone" sx={{ fontSize: '16px' }} />
          <Box component="p" sx={{ margin: 0, fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif", fontSize: '15px' }}>
            987654321
          </Box>
        </Box>
      </Box>

      {/* Logo */}
      <Box>
        <Box
          component="img"
          src="/assets/img/icones/logo.webp"
          alt="Jardim Exótico"
          sx={{
            width: '125px',
            paddingTop: '26px',
            position: 'relative',
            left: '-1.8vw',
          }}
        />
      </Box>

      {/* Informações Menu */}
      <Box
        className="informações-menu"
        sx={{
          width: '330px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: '25px',
        }}
      >
        <Box
          component="i"
          className="fa-solid fa-heart clicavel"
          onClick={onFavoriteClick}
          sx={{
            fontSize: '20px',
            cursor: 'pointer',
            '&:hover': {
              color: '#518432',
            },
          }}
        />
        <Box
          component="p"
          className="clicavel"
          onClick={onLoginClick}
          sx={{
            display: 'inline',
            fontSize: '15px',
            fontWeight: 400,
            margin: 0,
            cursor: 'pointer',
            fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
            '&:hover': {
              color: '#518432',
            },
          }}
        >
          <Box component="i" className="fa-solid fa-user login" sx={{ fontSize: '20px', paddingRight: '8px' }} />
        </Box>
        <Box
          component="i"
          className="fa-solid fa-basket-shopping clicavel"
          id="abrir-carrinho"
          onClick={onCartOpen}
          sx={{
            fontSize: '20px',
            cursor: 'pointer',
            '&:hover': {
              color: '#518432',
            },
          }}
        />
      </Box>
    </Box>
  );
}
