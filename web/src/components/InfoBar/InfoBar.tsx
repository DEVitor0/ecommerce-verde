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
      id="informativos"
      sx={{ 
        marginTop: '1.5vh !important',
        marginBottom: '5vh !important',
        width: '100% !important',
        height: 'auto !important',
        display: 'flex !important',
        justifyContent: 'center !important',
        alignItems: 'center !important',
        flexDirection: 'row !important',
      }}
    >
      {infoItems.map((item, index) => (
        <Box 
          key={index}
          className="container-informativos"
          sx={{ 
            paddingRight: '20px !important',
            display: 'flex !important',
            alignItems: 'center !important',
            borderRight: index < infoItems.length - 1 ? '1px solid #AAAAAA !important' : 'none !important',
          }}
        >
          <Box sx={{ fontSize: '26px !important', paddingRight: '10px !important', paddingLeft: '10px !important', color: '#47941a !important' }}>
            {item.icon}
          </Box>
          <Box>
            <Typography component="p" sx={{ fontSize: '18px !important', fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif !important", margin: '0 !important' }}>
              {item.title}
            </Typography>
            <Typography component="p" sx={{ color: '#616060 !important', fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif !important", margin: '0 !important' }}>
              {item.subtitle}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
