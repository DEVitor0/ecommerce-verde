'use client';

import { Box } from '@mui/material';
import { useState, ReactNode, Children } from 'react';

interface ProductCarouselProps {
  children: ReactNode;
}

export function ProductCarousel({ children }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const childrenArray = Children.toArray(children);
  const firstRow = childrenArray.slice(0, 5);
  const secondRow = childrenArray.slice(5, 10);

  const handleNext = () => {
    if (currentIndex < 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <Box 
        id="seção-produtos"
        sx={{ 
          width: '100% !important',
          height: 'auto !important',
          display: 'grid !important',
          justifyItems: 'center !important',
        }}
      >
        <Box
          className="container-plantas container-populares"
          sx={{
            width: '100% !important',
            height: 'auto !important',
            display: 'flex !important',
            justifyContent: 'center !important',
            alignItems: 'center !important',
            position: 'relative !important',
          }}
        >
          <Box
            sx={{
              width: '1200px !important',
              maxWidth: '100% !important',
              overflow: 'hidden !important',
              display: 'flex !important',
              justifyContent: 'flex-start !important',
            }}
          >
            <Box
              sx={{
                display: 'flex !important',
                transform: `translateX(${currentIndex * -300}px) !important`,
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important',
              }}
            >
              {firstRow.map((child, index) => (
                <Box
                  key={`first-${index}`}
                  sx={{
                    flex: '0 0 auto !important',
                  }}
                >
                  {child}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        
        {secondRow.length > 0 && (
          <Box
            className="container-plantas container-populares"
            sx={{
              width: '100% !important',
              height: 'auto !important',
              display: 'flex !important',
              justifyContent: 'center !important',
              alignItems: 'center !important',
              position: 'relative !important',
            }}
          >
            <Box
              sx={{
                width: '1200px !important',
                maxWidth: '100% !important',
                overflow: 'hidden !important',
                display: 'flex !important',
                justifyContent: 'flex-start !important',
              }}
            >
              <Box
                sx={{
                  display: 'flex !important',
                  transform: `translateX(${currentIndex * -300}px) !important`,
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important',
                }}
              >
                {secondRow.map((child, index) => (
                  <Box
                    key={`second-${index}`}
                    sx={{
                      flex: '0 0 auto !important',
                    }}
                  >
                    {child}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

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
          gap: '15px !important',
        }}
      >
        <Box
          onClick={handlePrevious}
          className="setas-carrossel clicavel"
          sx={{ 
            width: '32px !important',
            height: '32px !important',
            padding: '8px !important',
            borderRadius: '50% !important',
            cursor: currentIndex > 0 ? 'pointer !important' : 'not-allowed !important',
            display: 'flex !important',
            justifyContent: 'center !important',
            alignItems: 'center !important',
            backgroundColor: currentIndex > 0 ? 'transparent !important' : '#e0e0e0 !important',
            border: currentIndex > 0 ? '2px solid #ccc !important' : 'none !important',
            opacity: currentIndex > 0 ? 1 : 0.5,
            transition: 'all 0.3s ease !important',
            '&:hover': {
              backgroundColor: currentIndex > 0 ? '#518432 !important' : '#e0e0e0 !important',
              borderColor: currentIndex > 0 ? '#518432 !important' : 'transparent !important',
              transform: currentIndex > 0 ? 'scale(1.1) !important' : 'none !important',
              boxShadow: currentIndex > 0 ? '0 4px 8px rgba(81, 132, 50, 0.3) !important' : 'none !important',
              '& i': {
                color: currentIndex > 0 ? '#fff !important' : '#999',
              }
            }
          }}
        >
          <i className="fa-solid fa-angle-left clicavel" style={{ fontSize: '16px', color: currentIndex > 0 ? '#666' : '#999', transition: 'color 0.3s ease' }}></i>
        </Box>
        
        <Box
          onClick={handleNext}
          className="setas-carrossel clicavel"
          sx={{ 
            width: '32px !important',
            height: '32px !important',
            padding: '8px !important',
            borderRadius: '50% !important',
            cursor: currentIndex < 1 ? 'pointer !important' : 'not-allowed !important',
            display: 'flex !important',
            justifyContent: 'center !important',
            alignItems: 'center !important',
            backgroundColor: currentIndex < 1 ? 'transparent !important' : '#e0e0e0 !important',
            border: currentIndex < 1 ? '2px solid #ccc !important' : 'none !important',
            opacity: currentIndex < 1 ? 1 : 0.5,
            transition: 'all 0.3s ease !important',
            '&:hover': {
              backgroundColor: currentIndex < 1 ? '#518432 !important' : '#e0e0e0 !important',
              borderColor: currentIndex < 1 ? '#518432 !important' : 'transparent !important',
              transform: currentIndex < 1 ? 'scale(1.1) !important' : 'none !important',
              boxShadow: currentIndex < 1 ? '0 4px 8px rgba(81, 132, 50, 0.3) !important' : 'none !important',
              '& i': {
                color: currentIndex < 1 ? '#fff !important' : '#999',
              }
            }
          }}
        >
          <i className="fa-solid fa-angle-right clicavel" style={{ fontSize: '16px', color: currentIndex < 1 ? '#666' : '#999', transition: 'color 0.3s ease' }}></i>
        </Box>
      </Box>
    </>
  );
}
