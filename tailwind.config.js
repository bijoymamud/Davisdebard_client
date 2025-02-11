/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      theme: {

      },
    },
  },
  plugins: [daisyui], // Use imported daisyui here
  daisyui: {
    themes: [{
      customLightTheme: {
        color: '#0b0504',
        background: '#f0f0f0',
        primary: '#4098a0',
        secondary: '#27272a',
        accent: '#477361',
      },
      customDarkTheme: {
        color: '#ffffff',
        background: '#0b0504',
        primary: '#4098a0',
        secondary: '#27272a',
        accent: '#92d3b8',
      },
    }]
  }
};





