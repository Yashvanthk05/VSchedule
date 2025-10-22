import { style } from '@vanilla-extract/css';
import { vars } from '../../style.css';

export const section = style({
  height: '100dvh',
  display: 'flex',
  flexDirection: 'column',
});

export const sechead = style({
  background: `linear-gradient(135deg,${vars.color.primary},black)`,
  fontSize: 32,
  fontWeight: 700,
  color: 'transparent',
  backgroundClip: 'text',
  textAlign: 'center',
});

export const secbody = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  marginTop: '3rem',
});