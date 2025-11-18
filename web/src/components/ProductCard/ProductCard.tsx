import { Box, Card, CardMedia, CardContent, Typography, IconButton, Chip } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';

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

// Product card component with hover actions
export function ProductCard({ name, price, originalPrice, discount, image, onAddToCart, onAddToWishlist, onQuickView }: ProductCardProps) {
  return (
    <Card 
      elevation={0}
      sx={{ 
        width: { xs: 220, md: 280 },
        height: { xs: 320, md: 450 },
        m: 1.25,
        display: 'inline-block',
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover .product-actions': {
          opacity: 1,
        }
      }}
    >
      {/* Discount badge */}
      {discount && (
        <Chip 
          label={`${discount}%`} 
          size="small"
          sx={{ 
            position: 'absolute', 
            top: 8, 
            left: 8, 
            bgcolor: 'warning.main', 
            color: 'white',
            fontWeight: 'bold',
            zIndex: 1
          }} 
        />
      )}
      
      {/* Product image */}
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{ 
          width: '100%', 
          height: '75%',
          objectFit: 'cover'
        }}
      />
      
      {/* Action buttons on hover */}
      <Box 
        className="product-actions"
        sx={{ 
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 2.5,
          opacity: 0,
          transition: 'opacity 0.2s ease-in'
        }}
      >
        <IconButton 
          size="small" 
          onClick={onAddToCart}
          sx={{ 
            bgcolor: 'background.paper', 
            '&:hover': { bgcolor: 'primary.dark', color: 'white' },
            borderRadius: '5px',
            p: 0.625
          }}
        >
          <ShoppingBasketIcon fontSize="small" />
        </IconButton>
        <IconButton 
          size="small"
          onClick={onAddToWishlist}
          sx={{ 
            bgcolor: 'background.paper', 
            '&:hover': { bgcolor: 'primary.dark', color: 'white' },
            borderRadius: '5px',
            p: 0.625
          }}
        >
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>
        <IconButton 
          size="small"
          onClick={onQuickView}
          sx={{ 
            bgcolor: 'background.paper', 
            '&:hover': { bgcolor: 'primary.dark', color: 'white' },
            borderRadius: '5px',
            p: 0.625
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Box>
      
      {/* Product info */}
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 600 }}>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            R$ {price.toFixed(2)}
          </Typography>
          {originalPrice && (
            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
              R$ {originalPrice.toFixed(2)}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
