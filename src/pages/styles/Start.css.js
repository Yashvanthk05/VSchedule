import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  
});

export const timetableGenerationContainer = style({
  position: 'relative',
  left: '40px',
  display: 'flex',
  margin: '50px auto',
  padding: '1rem',
  backgroundColor: '#f0f9ff',
  borderRadius: '12px',
  border: '2px solid #3b82f6',
  cursor: 'pointer',
});