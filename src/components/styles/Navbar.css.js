import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../style.css';

export const navbar = style({
  backgroundColor: vars.color.primary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 20,
  height: 60,
});

export const nav_section = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '1rem',
});

export const navhead = style({
  fontWeight: 'bold',
});

globalStyle(`${navbar} a`, {
  textDecoration: 'none',
  color: 'white',
  fontSize: 22,
  fontWeight: 600,
});
