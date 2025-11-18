import { Box, Typography, TextField, Button, Link, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Footer component with newsletter and links
export function Footer() {
  return (
    <Box component="footer" sx={{ width: '100%', pt: 2.5, color: 'text.primary' }}>
      {/* Newsletter section */}
      <Box 
        sx={{ 
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          mt: 5,
          mb: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmailIcon sx={{ fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontSize: 20 }}>
            INSCREVA-SE PARA MAIS NOVIDADES
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField 
            placeholder="Insira Seu Email Aqui"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: { fontSize: 18 }
            }}
          />
          <Button 
            variant="contained" 
            color="primary"
            sx={{ borderRadius: '5px', px: 2 }}
          >
            Enviar
          </Button>
        </Box>
      </Box>

      {/* Footer content */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        <Box 
          sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            maxWidth: 1200,
            margin: '0 auto'
          }}
        >
          {/* Quick links */}
          <Box sx={{ flex: 1, minWidth: 250, m: 2.5 }}>
            <Typography variant="h6" sx={{ fontSize: 20, mb: 2.5 }}>
              Links Rápidos
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, fontSize: 16, lineHeight: 1.6 }}>
              <Box component="li" sx={{ mb: 1.25 }}>
                <Link href="#" color="inherit" underline="none">Home</Link>
              </Box>
              <Box component="li" sx={{ mb: 1.25 }}>
                <Link href="#" color="inherit" underline="none">Promoções</Link>
              </Box>
              <Box component="li" sx={{ mb: 1.25 }}>
                <Link href="#" color="inherit" underline="none">Blog</Link>
              </Box>
            </Box>
          </Box>

          {/* Contact */}
          <Box sx={{ flex: 1, minWidth: 250, m: 2.5 }}>
            <Typography variant="h6" sx={{ fontSize: 20, mb: 2.5 }}>
              Contato
            </Typography>
            <Box sx={{ fontSize: 16, lineHeight: 1.6 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <LocationOnIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Rua Exemplo, 123, Cidade, País
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <PhoneIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                +55 123 456 7890
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <EmailIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                contato@empresa.com
              </Typography>
            </Box>
          </Box>

          {/* Social media */}
          <Box sx={{ flex: 1, minWidth: 250, m: 2.5 }}>
            <Typography variant="h6" sx={{ fontSize: 20, mb: 2.5 }}>
              Redes Sociais
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center' }}>
              <IconButton color="inherit" sx={{ '&:hover': { color: 'primary.dark' } }}>
                <YouTubeIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton color="inherit" sx={{ '&:hover': { color: 'primary.dark' } }}>
                <FacebookIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton color="inherit" sx={{ '&:hover': { color: 'primary.dark' } }}>
                <InstagramIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton color="inherit" sx={{ '&:hover': { color: 'primary.dark' } }}>
                <LinkedInIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box sx={{ textAlign: 'center', py: 2.5 }}>
          <Typography variant="body2" sx={{ fontSize: 14 }}>
            &copy; 2024 Jardim Exótico | Todos os direitos reservados.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
