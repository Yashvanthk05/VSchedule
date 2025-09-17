import { style } from '@vanilla-extract/css';
import { vars } from '../../style.css';

export const ttheader = style({
  textAlign: 'center',
  fontSize: 14,
  whiteSpace: 'pre-line',
  padding: '10px 8px',
  fontWeight: 600,
  backgroundColor: vars.color.primary,
  color: vars.color.base,
});

export const theader = style({
});

export const table = style({
});

export const tdefault = style({
  backgroundColor: vars.color.cell,
  color: 'black',
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.thead,
    },
  },
  height: '80px',
  width: '100px',
});

export const lunch_bg = style({
  backgroundColor: vars.color.lunch,
  padding: '0.5rem',
});

export const lunch = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: '0.5rem',
  fontWeight: 'bold',
});

export const day = style({
  backgroundColor: vars.color.primary,
  color: vars.color.base,
  fontWeight: 600,
  textAlign: 'center',
  padding: '8px',
  border: `1px solid ${vars.color.border}`,
});

export const filled = style({
  backgroundColor: '#b8fc92',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#b8fc92',
  },
});

export const clash = style({
  backgroundColor: '#ff6161',
  ':hover': {
    backgroundColor: '#ff6161',
  },
});

export const btn = style({
  border: 'none',
  padding: '10px',
  display: 'flex',
  gap: '8px',
  borderRadius: '6px',
  fontWeight: 600,
  cursor: 'pointer',
});

export const btns = style({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'end',
});

export const reset = style({
  backgroundColor: vars.color.danger,
  color: 'white',
});

export const download = style({
  backgroundColor: vars.color.primary,
  color: 'white',
});
