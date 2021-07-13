import { createCss, StitchesCss } from '@stitches/react'

const toRem = (px: number) => px / 16 + 'rem'

export const space = {
  0: '0',
  1: toRem(1),
  2: toRem(2),
  4: toRem(4),
  6: toRem(6),
  8: toRem(8),
  10: toRem(10),
  12: toRem(12),
  14: toRem(14),
  16: toRem(16),
  20: toRem(20),
  24: toRem(24),
  28: toRem(28),
  32: toRem(32),
  36: toRem(36),
  40: toRem(40),
} as const

type SpaceValue = `$${keyof typeof space}` | (string & Record<never, never>)

const stitchesConfig = createCss({
  theme: {
    colors: {
      green: 'hsla(160, 53%, 26%, 1)',
      darkGreen: 'hsla(160, 54%, 19%, 1)',
      white: '#FFFFFF',
    },
    fonts: {
      sans: '-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
    },
    fontWeights: {
      normal: '500',
      bold: '600',
    },
    fontSizes: {
      lg: `clamp(${toRem(24)}, 2vw, ${toRem(36)})`,
      xl: `clamp(${toRem(54)}, 2vw, ${toRem(64)})`,
    },
    lineHeights: {
      none: 1,
      small: 1.1,
      normal: 1.2,
      double: 2,
    },
    space,
    transitions: {
      appearance: '0.2s ease',
      motion: '0.3s cubic-bezier(0.2, 1, 0.2, 1)',
    },
  },
  media: {
    hover: '(hover: hover)',
  },
  utils: {
    m: () => (value: SpaceValue) => ({
      margin: value,
    }),
    mt: () => (value: SpaceValue) => ({
      marginTop: value,
    }),
    mr: () => (value: SpaceValue) => ({
      marginRight: value,
    }),
    mb: () => (value: SpaceValue) => ({
      marginBottom: value,
    }),
    ml: () => (value: SpaceValue) => ({
      marginLeft: value,
    }),
    mx: () => (value: SpaceValue) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: () => (value: SpaceValue) => ({
      marginTop: value,
      marginBottom: value,
    }),
    p: () => (value: SpaceValue) => ({
      padding: value,
    }),
    pt: () => (value: SpaceValue) => ({
      paddingTop: value,
    }),
    pr: () => (value: SpaceValue) => ({
      paddingRight: value,
    }),
    pb: () => (value: SpaceValue) => ({
      paddingBottom: value,
    }),
    pl: () => (value: SpaceValue) => ({
      paddingLeft: value,
    }),
    px: () => (value: SpaceValue) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: () => (value: SpaceValue) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
})

export const { styled, css, global, keyframes, getCssString, theme } =
  stitchesConfig

export type CSS = StitchesCss<typeof stitchesConfig>
