import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        // Terminal palette
        term: {
          bg: '#0c0c0c',
          surface: '#161616',
          border: '#2a2a2a',
          dim: '#555555',
          muted: '#7a7a7a',
          text: '#b0b0b0',
          bright: '#e0e0e0',
          white: '#f0f0f0',
        },
        // Rarity colors - terminal ANSI-inspired
        common: '#808080',
        uncommon: '#5af78e',
        rare: '#57c7ff',
        epic: '#c792ea',
        legendary: '#f3f99d',
        shiny: '#ffb86c',
        // Accent
        prompt: '#ff9e64',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
} satisfies Config
