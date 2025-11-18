import { Dialog, DialogContent, Box, Typography, IconButton, Button, Rating } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ProductQuickViewProps {
  open: boolean;
  onClose: () => void;
  product?: {
    name: string;
    price: number;
    image: string;
    installments?: string;
  };
}

// Quick view modal for products
export function ProductQuickView({ open, onClose, product }: ProductQuickViewProps) {
  if (!product) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          width: 600,
          borderRadius: '5px',
          p: 2
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          {/* Product image */}
          <Box sx={{ width: '50%' }}>
            <Box 
              component="img"
              src={product.image}
              alt={product.name}
              sx={{ 
                width: '100%',
                height: 250,
                objectFit: 'cover'
              }}
            />
          </Box>

          {/* Product details */}
          <Box sx={{ width: '50%', pl: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.625 }}>
              <Typography variant="h6" sx={{ fontSize: 24, fontWeight: 'bold' }}>
                {product.name}
              </Typography>
              <IconButton onClick={onClose} size="small">
                <CloseIcon sx={{ fontSize: 24 }} />
              </IconButton>
            </Box>

            <Box sx={{ pb: 1.25, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" sx={{ fontSize: 18 }}>
                Ref: 10
              </Typography>
              <Rating value={5} readOnly sx={{ color: 'info.main' }} />
            </Box>

            <Box sx={{ mt: 1.25 }}>
              <Typography variant="h5" sx={{ fontSize: 22 }}>
                R$ {product.price.toFixed(2)}
              </Typography>
              {product.installments && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {product.installments}
                </Typography>
              )}
            </Box>

            <Button 
              variant="contained"
              fullWidth
              sx={{ 
                mt: 1.875,
                bgcolor: 'secondary.main',
                color: 'white',
                borderRadius: '5px',
                py: 0.625,
                '&:hover': {
                  bgcolor: 'secondary.dark'
                }
              }}
            >
              Comprar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
