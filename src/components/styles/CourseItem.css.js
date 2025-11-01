import { style } from '@vanilla-extract/css';
import { vars } from '../../style.css';

export const item = style({
  padding: '1rem',
  backgroundColor: vars.color.secondary,
  margin: '10px',
  display: 'flex',
  alignItems: 'center',
  border:`1px solid ${vars.color.accent}`
});

export const desc = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '0.5rem',
  textAlign: 'center',
});

export const crossBtn = style({
  color: 'red',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.5rem',
});

export const dropdown = style({
  backgroundColor: vars.color.secondary,
  border: `1px solid ${vars.color.border}`,
  padding: '10px',
  borderRadius: '6px',
  width:`100%`,
});

export const slot=style({
  width:"95px",
})

export const tickBtn = style({
  color: 'green',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.5rem',
});
