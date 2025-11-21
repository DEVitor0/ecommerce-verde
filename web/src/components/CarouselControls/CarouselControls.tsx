'use client';

import { Box } from '@mui/material';

interface CarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
}

// Carousel navigation arrows matching legacy styles exactly
export function CarouselControls({ onPrevious, onNext }: CarouselControlsProps) {
  return (
    <Box 
      className="mover-produtos-principais"
      sx={{ 
        width: '100% !important',
        height: '1px !important',
        display: 'flex !important',
        justifyContent: 'center !important',
        position: 'relative !important',
        top: '-4vh !important',
        marginBottom: '3vh !important',
      }}
    >
      <Box
        onClick={onPrevious}
        className="setas-carrossel"
        sx={{ 
          width: '20px !important',
          height: '20px !important',
          padding: '3px !important',
          marginRight: '10px !important',
          borderRadius: '100% !important',
          cursor: 'pointer !important',
          display: 'flex !important',
          justifyContent: 'center !important',
          alignItems: 'center !important',
          backgroundColor: 'transparent !important',
          border: '1px solid #ccc !important',
          '&:hover': {
            backgroundColor: '#f0f0f0 !important',
          }
        }}
      >
        <i className="fa-solid fa-angle-left" style={{ fontSize: '12px', color: '#666' }}></i>
      </Box>
      
      <Box
        onClick={onNext}
        className="setas-carrossel"
        sx={{ 
          width: '20px !important',
          height: '20px !important',
          padding: '3px !important',
          borderRadius: '100% !important',
          cursor: 'pointer !important',
          display: 'flex !important',
          justifyContent: 'center !important',
          alignItems: 'center !important',
          backgroundColor: 'transparent !important',
          border: '1px solid #ccc !important',
          '&:hover': {
            backgroundColor: '#f0f0f0 !important',
          }
        }}
      >
        <i className="fa-solid fa-angle-right" style={{ fontSize: '12px', color: '#666' }}></i>
      </Box>
    </Box>
  );
}
