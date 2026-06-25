import { style } from '@vanilla-extract/css';
import { vars } from '../../style.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  minHeight: '100vh',
});

export const hero = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2rem',
  margin: 'auto',
  textAlign: 'center',
});

export const h1 = style({
  color: vars.color.text,
  fontSize: '2rem',
});

export const p = style({
  color: vars.color.muted,
  fontSize: '1.2rem',
});

export const button = style({
  backgroundColor: vars.color.primary,
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '1rem 2rem',
  cursor: 'pointer',
});

export const footer = style({
  textAlign: 'center',
  color: vars.color.muted,
  padding: '1rem',
  backgroundColor: vars.color.base,
});
