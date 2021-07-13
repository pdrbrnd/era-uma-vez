import ExpandingTextarea from 'react-expanding-textarea'

import { styled } from 'lib/style'

export const Input = styled('input', {
  appearance: 'none',
  border: 'none',
  background: 'transparent',
  boxShadow: 'none',

  display: 'block',
  width: '100%',

  fontSize: '$xl',
  fontFamily: '$sans',
  fontWeight: '$normal',
  lineHeight: '$none',
  color: '$white',

  outline: 'none',
})

export const Textarea = styled(ExpandingTextarea, {
  appearance: 'none',
  border: 'none',
  background: 'transparent',
  boxShadow: 'none',

  display: 'block',
  width: '100%',

  fontSize: '$xl',
  fontFamily: '$sans',
  fontWeight: '$normal',
  lineHeight: '$none',
  color: '$white',

  outline: 'none',

  resize: 'none',
})
