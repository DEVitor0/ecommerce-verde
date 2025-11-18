import { Box, Typography, Avatar } from '@mui/material';
import { useState, useEffect } from 'react';

interface RecommendationItem {
  name: string;
  role: string;
  message: string;
  image: string;
}

interface RecommendationProps {
  items: RecommendationItem[];
}

// Recommendation/testimonial carousel section
export function Recommendation({ items }: RecommendationProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  const activeItem = items[activeIndex];

  return (
    <Box 
      sx={{ 
        width: '100%',
        height: 400,
        margin: 'auto',
        backgroundImage: 'url(/src/assets/img/fundos/testibg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
        position: 'relative'
      }}
    >
      <Avatar 
        src={activeItem.image}
        sx={{ 
          width: 100, 
          height: 100,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
      
      <Box sx={{ mt: 2, transition: 'opacity 0.5s ease-in-out' }}>
        <Typography variant="h6" sx={{ fontSize: 20, textAlign: 'center', color: 'primary.dark' }}>
          {activeItem.name}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 17, textAlign: 'center', color: 'text.secondary' }}>
          {activeItem.role}
        </Typography>
      </Box>
      
      <Box sx={{ mt: 2, transition: 'opacity 0.5s ease-in-out' }}>
        <Typography variant="body1" sx={{ width: 600, textAlign: 'center', maxWidth: '90%' }}>
          {activeItem.message}
        </Typography>
      </Box>
      
      {/* Dots indicator */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 0.625 }}>
        {items.map((_, index) => (
          <Box
            key={index}
            onClick={() => setActiveIndex(index)}
            sx={{
              width: 13,
              height: 13,
              borderRadius: '50%',
              bgcolor: activeIndex === index ? 'grey.900' : 'grey.300',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
