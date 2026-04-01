/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
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
        common: '#808080',
        uncommon: '#5af78e',
        rare: '#57c7ff',
        epic: '#c792ea',
        legendary: '#f3f99d',
        shiny: '#ffb86c',
        prompt: '#ff9e64',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
}
