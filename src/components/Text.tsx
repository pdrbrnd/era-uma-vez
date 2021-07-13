import { styled } from 'lib/style'

export const Text = styled('p', {
  variants: {
    variant: {
      small: {
        fontSize: '$lg',
        fontWeight: '$normal',
        lineHeight: '$normal',
      },
      normal: {
        fontSize: '$xl',
        fontWeight: '$normal',
        lineHeight: '$small',
      },
    },
  },
  defaultVariants: {
    variant: 'normal',
  },
})
