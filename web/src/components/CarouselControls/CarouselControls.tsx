import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface CarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
}

// Carousel navigation arrows
export function CarouselControls({ onPrevious, onNext }: CarouselControlsProps) {
  return (
    <Box 
      sx={{ 
        width: '100%',
        height: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: '-4vh',
        mb: 3
      }}
    >
      <IconButton
        onClick={onPrevious}
        sx={{ 
          width: 26,
          height: 26,
          bgcolor: 'grey.300',
          borderRadius: '50%',
          mr: 1.25,
          '&:hover': {
            bgcolor: 'grey.500'
          }
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: 16 }} />
      </IconButton>
      
      <IconButton
        onClick={onNext}
        sx={{ 
          width: 26,
          height: 26,
          bgcolor: 'grey.300',
          borderRadius: '50%',
          '&:hover': {
            bgcolor: 'grey.500'
          }
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  );
}
