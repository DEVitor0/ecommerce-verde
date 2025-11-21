import { Box, Typography } from '@mui/material';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  highlightColor?: 'primary' | 'success';
}

export function SectionTitle({ title, subtitle, highlightColor = 'primary' }: SectionTitleProps) {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
      <Typography variant="h4" sx={{ fontFamily: 'Montserrat, sans-serif !important', fontSize: '32px !important', fontWeight: '600 !important', textAlign: 'center', color: '#000 !important' }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h6" sx={{ fontFamily: 'Montserrat, sans-serif !important', fontSize: '22px !important', fontWeight: '300 !important', color: '#518432 !important', textAlign: 'center' }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
