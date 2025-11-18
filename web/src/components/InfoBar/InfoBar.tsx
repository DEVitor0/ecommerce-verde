import { Box, Typography } from '@mui/material';
import HeadsetIcon from '@mui/icons-material/Headset';
import PaidIcon from '@mui/icons-material/Paid';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Info bar with service highlights
export function InfoBar() {
  const infoItems = [
    { icon: <HeadsetIcon />, title: 'Suporte Gratuito', subtitle: 'Atendimento de Segunda a Sexta' },
    { icon: <PaidIcon />, title: 'Reembolso Garantido', subtitle: 'Pagamentos 100% Seguros' },
    { icon: <LocalShippingIcon />, title: 'Frete Grátis', subtitle: 'Rápido, Seguro e Confiável' },
    { icon: <CheckCircleIcon />, title: 'Garantia de Satisfação', subtitle: 'Cliente Satisfeito é Nossa Prioridade' },
  ];

  return (
    <Box 
      sx={{ 
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 3,
        my: 3
      }}
    >
      {infoItems.map((item, index) => (
        <Box 
          key={index}
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            pr: 2.5,
            height: 60,
            borderRight: index < infoItems.length - 1 ? '1px solid' : 'none',
            borderColor: 'divider'
          }}
        >
          <Box sx={{ fontSize: 26, mr: 1.25, ml: 1.25, color: 'primary.dark' }}>
            {item.icon}
          </Box>
          <Box>
            <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 600 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.subtitle}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
