import { Box } from './Box'

export const Stickers = (): JSX.Element => {
  return (
    <Box
      css={{
        position: 'fixed',
        bottom: '$40',
        right: '$40',
        zIndex: '1000',
        width: '240px',
      }}
    >
      <img src="/stickers.png" alt="stickers" />
    </Box>
  )
}
