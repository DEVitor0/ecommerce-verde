import { Box, Card, Typography, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  onReadMore?: () => void;
}

// Blog card component matching legacy design
export function BlogCard({ title, excerpt, date, image, onReadMore }: BlogCardProps) {
  return (
    <Card 
      elevation={0}
      sx={{ 
        width: '80%',
        minHeight: 220,
        m: '0 15px',
        display: 'flex',
        flexDirection: 'row',
        boxShadow: 'none',
        bgcolor: 'transparent',
        overflow: 'visible'
      }}
    >
      {/* Blog image */}
      <Box 
        sx={{ 
          width: '17vw',
          height: 220,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left',
          borderRadius: '5px'
        }} 
      />
      
      {/* Blog content */}
      <Box sx={{ 
        width: 320, 
        height: 'auto',
        p: '10px', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* Date */}
        <Box sx={{ width: '100%', height: 'auto', mb: '8px' }}>
          <CalendarMonthIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
          <Typography 
            component="span" 
            variant="body2" 
            sx={{ 
              display: 'inline-block',
              color: 'text.secondary',
              ml: 0.5
            }}
          >
            {date}
          </Typography>
        </Box>
        
        {/* Title and excerpt */}
        <Box sx={{ 
          textAlign: 'left', 
          mb: '10px',
          width: 270
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              mb: '10px', 
              textAlign: 'left',
              fontSize: '1rem',
              fontFamily: '"Open Sans", "Helvetica Neue", sans-serif'
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'left',
              fontFamily: '"Open Sans", "Helvetica Neue", sans-serif'
            }}
          >
            {excerpt}
          </Typography>
        </Box>
        
        {/* Read more button */}
        <Box>
          <Button 
            onClick={onReadMore}
            variant="outlined"
            className="clicavel"
            sx={{ 
              border: '1px solid',
              borderColor: '#47941a',
              bgcolor: 'transparent',
              padding: '5px 10px',
              borderRadius: '20px',
              color: 'black',
              alignSelf: 'flex-end',
              textTransform: 'none',
              fontWeight: 400,
              '&:hover': {
                bgcolor: '#47941a',
                color: 'white',
                transition: '0.2s linear'
              }
            }}
          >
            LER MAIS
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
