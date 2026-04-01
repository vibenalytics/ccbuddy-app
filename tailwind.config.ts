import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        bg: '#0a0e17',
        surface: '#111827',
        border: '#1e293b',
        common: '#6b7280',
        uncommon: '#22c55e',
        rare: '#06b6d4',
        epic: '#a855f7',
        legendary: '#eab308',
        shiny: '#fbbf24',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
} satisfies Config
