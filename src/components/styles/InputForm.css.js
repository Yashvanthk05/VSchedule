import { style } from '@vanilla-extract/css';
import { vars } from '../../style.css';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '2rem',
  width: '600px',
  backgroundColor: vars.color.accent,
  margin: 'auto',
  borderRadius: '4px',
});

export const section = style({
  gap: '2rem',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
});

export const label = style({
  flex: 1,
  textTransform: 'uppercase',
});

export const input = style({
  flex: 1,
  padding: '0.5rem',
  backgroundColor: 'white',
  outlineColor: vars.color.secondary,
  border: 'none',
});

export const buttons = style({
  display: 'flex',
  gap: '1rem',
});

export const addBtn = style({
  flex: 1,
  padding: '0.8rem',
  backgroundColor: vars.color.primary,
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
});
export const reset = style({
  flex: 1,
  padding: '0.8rem',
  backgroundColor: vars.color.danger,
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
});

export const suggestion = style({
  position: 'absolute',
  top: '2.5rem',
  backgroundColor: vars.color.secondary,
  zIndex: 2,
  borderRadius: '5px',
  width: '100%',
});

export const suggestitem = style({
  padding: '8px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.thead,
    },
  },
});

export const light = style({
  color: vars.color.muted,
  cursor: 'not-allowed',
});

export const highlight = style({
  backgroundColor: vars.color.thead,
});
