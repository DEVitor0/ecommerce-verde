'use client';

import { Box } from '@mui/material';

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  onAddToCart?: () => void;
  onAddToWishlist?: () => void;
  onQuickView?: () => void;
}

export function ProductCard({ name, price, originalPrice, discount, image, onAddToCart, onAddToWishlist, onQuickView }: ProductCardProps) {
  return (
    <Box 
      className="produtos-plantas"
      sx={{ 
        width: '280px !important',
        height: '450px !important',
        margin: '10px !important',
        display: 'inline-block !important',
        position: 'relative !important',
        animation: 'slideDireita 0.260s ease forwards',
        '&:hover': {
          '& .container-acessórios-produtos .acessórios-produtos': {
            display: 'block !important',
          }
        }
      }}
    >
      {discount && (
        <Box 
          className="desconto"
          sx={{ 
            width: '45px !important',
            padding: '5px !important',
            borderRadius: '5px !important',
            backgroundColor: '#F0524B !important',
            color: 'white !important',
            textAlign: 'center !important',
            position: 'absolute !important',
            fontSize: '15px !important',
            fontWeight: 'normal !important',
            zIndex: 1,
            lineHeight: '1.2 !important',
          }}
        >
          <Box component="p" sx={{ margin: '0 !important' }}>{discount}%</Box>
        </Box>
      )}
      
      <Box 
        className="container-imagens-produtos"
        sx={{ 
          width: '100% !important', 
          height: '75% !important',
        }}
      >
        <img 
          src={image}
          alt={name}
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>
      
      <Box 
        className="container-acessórios-produtos"
        sx={{ 
          width: '100% !important',
          height: '1% !important',
          display: 'flex !important',
          justifyContent: 'center !important',
          alignItems: 'center !important',
          gap: '20px !important',
        }}
      >
        <Box 
          className="acessórios-produtos sexta-carrinho"
          onClick={onAddToCart}
          sx={{ 
            display: 'none !important',
            width: '40px !important',
            height: '40px !important',
            borderRadius: '5px !important',
            padding: '0 !important',
            backgroundColor: 'white !important',
            position: 'relative !important',
            top: '-2.5vh !important',
            cursor: 'pointer !important',
            justifyContent: 'center !important',
            alignItems: 'center !important',
            '& i': {
              display: 'flex !important',
              justifyContent: 'center !important',
              alignItems: 'center !important',
              width: '100% !important',
              height: '100% !important',
            },
            '&:hover': {
              backgroundColor: '#47941a !important',
              color: 'white !important',
              transition: '0.2s ease-in !important',
              '& i': {
                color: 'white !important',
              }
            }
          }}
        >
          <i className="fa-solid fa-basket-shopping" style={{ fontSize: '20px' }}></i>
        </Box>
        <Box 
          className="acessórios-produtos"
          onClick={onAddToWishlist}
          sx={{ 
            display: 'none !important',
            width: '40px !important',
            height: '40px !important',
            borderRadius: '5px !important',
            padding: '0 !important',
            backgroundColor: 'white !important',
            position: 'relative !important',
            top: '-2.5vh !important',
            justifyContent: 'center !important',
            alignItems: 'center !important',
            '& i': {
              display: 'flex !important',
              justifyContent: 'center !important',
              alignItems: 'center !important',
              width: '100% !important',
              height: '100% !important',
            },
            '&:hover': {
              backgroundColor: '#47941a !important',
              color: 'white !important',
              transition: '0.2s ease-in !important',
            }
          }}
        >
          <i className="fa-regular fa-heart" style={{ fontSize: '20px' }}></i>
        </Box>
        <Box 
          className="acessórios-produtos"
          onClick={onQuickView}
          sx={{ 
            display: 'none !important',
            width: '40px !important',
            height: '40px !important',
            borderRadius: '5px !important',
            padding: '0 !important',
            backgroundColor: 'white !important',
            position: 'relative !important',
            top: '-2.5vh !important',
            justifyContent: 'center !important',
            alignItems: 'center !important',
            '& i': {
              display: 'flex !important',
              justifyContent: 'center !important',
              alignItems: 'center !important',
              width: '100% !important',
              height: '100% !important',
            },
            '&:hover': {
              backgroundColor: '#47941a !important',
              color: 'white !important',
              transition: '0.2s ease-in !important',
            }
          }}
        >
          <i className="fa-regular fa-eye" style={{ fontSize: '20px' }}></i>
        </Box>
      </Box>
      
      <Box 
        className="container-preço-plantas"
        sx={{ 
          width: '100% !important',
          height: 'auto !important',
          textAlign: 'center !important',
          marginTop: '10px !important',
        }}
      >
        <Box 
          component="h3"
          sx={{ 
            fontSize: '18px !important',
            fontWeight: 'normal !important',
            marginBottom: '8px !important',
            margin: '0 0 8px 0 !important',
            fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif !important",
          }}
        >
          {name}
        </Box>
        <Box sx={{ display: 'inline !important' }}>
          <Box 
            component="p"
            sx={{ 
              display: 'inline !important',
              marginRight: '8px !important',
              fontWeight: 'normal !important',
              fontSize: '16px !important',
              margin: '0 8px 0 0 !important',
              fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif !important",
            }}
          >
            R$ {price.toFixed(2)}
          </Box>
          {originalPrice && (
            <Box 
              component="del"
              sx={{ 
                display: 'inline !important',
                textDecoration: 'line-through !important',
                color: '#AAAAAA !important',
                fontSize: '14px !important',
                fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif !important",
              }}
            >
              R$ {originalPrice.toFixed(2)}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
