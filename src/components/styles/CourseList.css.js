import { style } from '@vanilla-extract/css';
import { vars } from '../../style.css';

export const heading = style({
  textAlign: 'center',
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
});

export const courseContainer = style({
  margin: '0rem 1rem',
});

export const noCaption = style({
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: vars.color.text,
  marginTop: '2rem',
});

export const listTitle = style({
  fontWeight: 600,
});
