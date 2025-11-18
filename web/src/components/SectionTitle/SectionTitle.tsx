import { Box, Typography } from '@mui/material';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  highlightColor?: 'primary' | 'success';
}

// Section title component - usado em varias secoes
export function SectionTitle({ title, subtitle, highlightColor = 'primary' }: SectionTitleProps) {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
      <Typography variant="h4" sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: 32, textAlign: 'center' }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h6" sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: 22, color: highlightColor === 'success' ? 'success.main' : 'primary.dark', textAlign: 'center' }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
