import { style } from '@vanilla-extract/css';
import { vars } from '../../style.css';

export const groupContainer = style({
  display: 'flex',
  maxWidth: '1000px',
  margin: 'auto',
});

export const container = style({
  margin: '2rem auto',
  display: 'flex',
  width: '450px',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const row = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '0.5rem',
});

export const row_h = style({
  textAlign: 'center',
  fontWeight: 'bold',
  margin: '1rem auto 0rem auto',
});

export const button = style({
  backgroundColor: vars.color.accent,
  flex: 1,
  border: 'none',
  padding: '0.5rem 0',
  cursor: 'pointer',
  borderRadius: '0.5rem',
});

export const button_c = style({
  backgroundColor: '#b8fc92',
  flex: 1,
  border: 'none',
  padding: '0.5rem 0',
  cursor: 'pointer',
  borderRadius: '0.5rem',
});
