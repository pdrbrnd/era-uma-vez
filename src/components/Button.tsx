import { styled } from 'lib/style'

export const Button = styled('button', {
  position: 'relative',

  appearance: 'none',
  boxShadow: 'none',
  border: 0,

  cursor: 'pointer',

  background: '$white',
  color: '$green',

  fontFamily: '$sans',
  fontSize: '$lg',
  fontWeight: '$bold',
  lineHeight: '$none',
  whiteSpace: 'nowrap',

  p: '$16 $24',
  borderRadius: '2px',

  '&:focus': {
    outline: 'none',
  },
  '&:focus-visible': {
    boxShadow: '0 0 0 $space$8 $colors$darkGreen',
  },

  '&:disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },

  $$transform: '$space$4',
  $$shadow: '$space$8',
  transition: 'transform $motion, box-shadow $motion, opacity $appearance',

  '@hover': {
    '&:hover': {
      outline: 0,
      transform: 'translate(-$$transform, -$$transform)',
      boxShadow: '$$shadow $$shadow 0 0 $colors$darkGreen',
    },
  },

  '&:active': {
    opacity: 0.8,
    boxShadow: 'unset',
    transform: 'unset',
  },
})
