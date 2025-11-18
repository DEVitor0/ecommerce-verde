import { Dialog, DialogContent, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface MessageModalProps {
  open: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message: string;
}

// Message modal for success/error feedback
export function MessageModal({ open, onClose, type, title, message }: MessageModalProps) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 450,
          height: 250,
          borderRadius: '5px',
          p: 2
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Box 
          sx={{ 
            width: 80, 
            height: 80, 
            borderRadius: '50%',
            bgcolor: type === 'success' ? 'success.main' : 'error.main',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}
        >
          {type === 'success' ? (
            <CheckCircleIcon sx={{ fontSize: 50, color: 'white' }} />
          ) : (
            <ErrorIcon sx={{ fontSize: 50, color: 'white' }} />
          )}
        </Box>
        
        <Typography variant="h5" sx={{ mt: 1.25, fontSize: 30 }}>
          {title}
        </Typography>
        
        <Typography variant="body1" sx={{ textAlign: 'center', width: 300, mt: 1.875 }}>
          {message}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
