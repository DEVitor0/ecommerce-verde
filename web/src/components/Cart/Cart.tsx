import { Box, Drawer, Typography, IconButton, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface CartProps {
  open: boolean;
  onClose: () => void;
  items?: any[];
}

// Shopping cart drawer
export function Cart({ open, onClose, items = [] }: CartProps) {
  const isEmpty = items.length === 0;
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 320,
          bgcolor: 'background.paper'
        }
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <IconButton onClick={onClose} sx={{ mr: 1 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
          Carrinho
        </Typography>
      </Box>

      {/* Empty state */}
      {isEmpty ? (
        <Box sx={{ height: '74%', width: '87%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 2.5 }}>
          <Typography variant="h6" sx={{ fontSize: 22, color: 'primary.main', mb: 3.75 }}>
            Seu carrinho está vazio :(
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Para continuar comprando, navegue pelas categorias do site ou faça uma busca pelo seu produto.
          </Typography>
        </Box>
      ) : (
        <>
          {/* Cart items */}
          <Box sx={{ overflowY: 'auto', flex: 1 }}>
            {items.map((item, index) => (
              <Box key={index} sx={{ borderBottom: '1px solid', borderColor: 'divider', p: 2.5, display: 'flex' }}>
                <Box sx={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box 
                    sx={{ 
                      width: 100, 
                      height: 100, 
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover'
                    }} 
                  />
                </Box>
                <Box sx={{ width: '70%', color: 'grey.700' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'primary.dark', mb: 0.75 }}>
                    <Typography variant="body1">{item.name}</Typography>
                    <IconButton size="small">
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.25 }}>
                    <Box sx={{ display: 'flex', gap: 1, border: '2px solid', borderColor: 'primary.dark', borderRadius: '5px', px: 1, alignItems: 'center' }}>
                      <Button size="small">-</Button>
                      <Typography>{item.quantity}</Typography>
                      <Button size="small">+</Button>
                    </Box>
                    <Typography sx={{ color: 'success.main' }}>R$ {item.price.toFixed(2)}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Clear cart button */}
          <Box sx={{ width: '100%', color: 'error.main', display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2.5 }}>
            <Typography variant="body1" sx={{ mr: 1, fontSize: 16, cursor: 'pointer' }}>
              Excluir todos os itens do carrinho
            </Typography>
            <DeleteOutlineIcon sx={{ fontSize: 16, cursor: 'pointer' }} />
          </Box>

          {/* Summary */}
          <Box sx={{ px: 3 }}>
            <Typography variant="h6" sx={{ fontSize: 22, fontWeight: 600, mb: 2 }}>
              Resumo da compra
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.625 }}>
              <Typography>Subtotal</Typography>
              <Typography>R$ {subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.625 }}>
              <Typography>Entrega</Typography>
              <Typography>Grátis</Typography>
            </Box>
          </Box>

          <Divider sx={{ mx: 3, my: 1.25 }} />

          {/* Total */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3, mb: 2 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">R$ {subtotal.toFixed(2)}</Typography>
          </Box>

          {/* Checkout button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
            <Button 
              variant="contained" 
              sx={{ 
                width: '84%',
                bgcolor: 'success.main',
                color: 'white',
                borderRadius: '5px',
                '&:hover': {
                  bgcolor: 'success.dark'
                }
              }}
            >
              Finalizar compra
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
}
