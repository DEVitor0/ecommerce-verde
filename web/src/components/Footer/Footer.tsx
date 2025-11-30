import { Box, Typography, TextField, Button, Link, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Footer component matching legacy design
export function Footer() {
  return (
    <Box component="footer" sx={{ width: '100%', color: 'black' }}>
      {/* Newsletter section */}
      <Box 
        id="conatiner-contato"
        sx={{ 
          width: '100%',
          height: 'auto',
          mt: '5vh',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <EmailIcon sx={{ fontSize: 28, pr: '5px' }} />
          <Typography 
            component="p" 
            sx={{ 
              display: 'inline',
              fontSize: 20
            }}
          >
            INSCREVA-SE PARA MAIS NOVIDADES
          </Typography>
        </Box>
        <Box>
          <TextField 
            placeholder="Insira Seu Email Aqui"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: { 
                fontSize: 18,
                border: 'none',
                '&:focus': {
                  outline: 'none'
                }
              }
            }}
          />
          <Button 
            variant="contained"
            sx={{ 
              border: 'none',
              bgcolor: '#47941a',
              color: 'white',
              borderRadius: '5px',
              padding: '6px',
              ml: 1
            }}
          >
            Enviar
          </Button>
        </Box>
      </Box>

      {/* Footer content */}
      <Box id="footer" sx={{ pt: '20px', color: 'black !important' }}>
        <Box 
          className="footer-container"
          sx={{ 
            borderTop: '1px solid #646464',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            margin: '0 auto',
            maxWidth: 1200
          }}
        >
          {/* Quick links */}
          <Box className="footer-section" sx={{ flex: 1, minWidth: 250, m: '20px' }}>
            <Typography 
              component="h2" 
              sx={{ 
                fontSize: 20, 
                mb: '20px',
                fontWeight: 400
              }}
            >
              Links Rápidos
            </Typography>
            <Box 
              component="ul" 
              sx={{ 
                fontSize: 16, 
                lineHeight: 1.6, 
                listStyle: 'none', 
                p: 0 
              }}
            >
              <Box component="li" sx={{ mb: '10px' }}>
                <Link 
                  href="#" 
                  sx={{ 
                    color: 'black', 
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Home
                </Link>
              </Box>
              <Box component="li" sx={{ mb: '10px' }}>
                <Link 
                  href="#" 
                  sx={{ 
                    color: 'black', 
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Promoções
                </Link>
              </Box>
              <Box component="li" sx={{ mb: '10px' }}>
                <Link 
                  href="#" 
                  sx={{ 
                    color: 'black', 
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Blog
                </Link>
              </Box>
            </Box>
          </Box>

          {/* Contact */}
          <Box className="footer-section" sx={{ flex: 1, minWidth: 250, m: '20px' }}>
            <Typography 
              component="h2" 
              sx={{ 
                fontSize: 20, 
                mb: '20px',
                fontWeight: 400
              }}
            >
              Contato
            </Typography>
            <Box>
              <Typography sx={{ fontSize: 16, lineHeight: 1.6, mb: 1 }}>
                <LocationOnIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: 20 }} />
                Rua Exemplo, 123, Cidade, País
              </Typography>
              <Typography sx={{ fontSize: 16, lineHeight: 1.6, mb: 1 }}>
                <PhoneIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: 20 }} />
                +55 123 456 7890
              </Typography>
              <Typography sx={{ fontSize: 16, lineHeight: 1.6, mb: 1 }}>
                <EmailIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: 20 }} />
                contato@empresa.com
              </Typography>
            </Box>
          </Box>

          {/* Social media */}
          <Box className="footer-section" sx={{ flex: 1, minWidth: 250, m: '20px' }}>
            <Typography 
              component="h2" 
              sx={{ 
                fontSize: 20, 
                mb: '20px',
                fontWeight: 400
              }}
            >
              Redes Sociais
            </Typography>
            <Box 
              className="social-icons"
              sx={{ 
                display: 'flex', 
                gap: '10px', 
                alignItems: 'center',
                transform: 'translateX(-20px)'
              }}
            >
              <Link 
                href="#" 
                sx={{ 
                  color: 'black',
                  fontSize: 20,
                  m: '0 10px',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#47941a'
                  }
                }}
              >
                <YouTubeIcon sx={{ fontSize: 28 }} />
              </Link>
              <Link 
                href="#" 
                sx={{ 
                  color: 'black',
                  fontSize: 20,
                  m: '0 10px',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#47941a'
                  }
                }}
              >
                <FacebookIcon sx={{ fontSize: 28 }} />
              </Link>
              <Link 
                href="#" 
                sx={{ 
                  color: 'black',
                  fontSize: 20,
                  m: '0 10px',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#47941a'
                  }
                }}
              >
                <InstagramIcon sx={{ fontSize: 28 }} />
              </Link>
              <Link 
                href="#" 
                sx={{ 
                  color: 'black',
                  fontSize: 20,
                  m: '0 10px',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#47941a'
                  }
                }}
              >
                <LinkedInIcon sx={{ fontSize: 28 }} />
              </Link>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box 
          className="footer-bottom"
          sx={{ 
            textAlign: 'center', 
            padding: '20px 0'
          }}
        >
          <Typography sx={{ m: 0, fontSize: 14 }}>
            &copy; 2024 Jardim Exótico | Todos os direitos reservados.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
