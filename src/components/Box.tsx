import { styled } from 'lib/style'

export const Box = styled('div', {})

export const Flex = styled('div', {
  display: 'flex',
})

export const Container = styled(Box, {
  maxWidth: '60vw',
  p: '$40',
})
