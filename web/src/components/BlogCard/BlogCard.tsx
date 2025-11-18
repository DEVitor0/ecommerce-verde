import { Box, Card, Typography, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  onReadMore?: () => void;
}

// Blog card component
export function BlogCard({ title, excerpt, date, image, onReadMore }: BlogCardProps) {
  return (
    <Card 
      elevation={0}
      sx={{ 
        width: '80%',
        height: 220,
        m: '0 15px',
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      {/* Blog image */}
      <Box 
        sx={{ 
          width: { xs: '20vw', md: '17vw' },
          height: 'auto',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left',
          borderRadius: '5px'
        }} 
      />
      
      {/* Blog content */}
      <Box sx={{ width: 320, p: 1.25, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <CalendarMonthIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {date}
          </Typography>
        </Box>
        
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1.25, textAlign: 'left' }}>
          {title}
        </Typography>
        
        <Typography variant="body2" sx={{ textAlign: 'left', mb: 1.25, flex: 1 }}>
          {excerpt}
        </Typography>
        
        <Button 
          onClick={onReadMore}
          variant="outlined"
          sx={{ 
            alignSelf: 'flex-start',
            borderRadius: '20px',
            border: '1px solid',
            borderColor: 'primary.main',
            color: 'text.primary',
            px: 1.25,
            py: 0.625,
            '&:hover': {
              bgcolor: 'primary.dark',
              color: 'white'
            }
          }}
        >
          LER MAIS
        </Button>
      </Box>
    </Card>
  );
}
