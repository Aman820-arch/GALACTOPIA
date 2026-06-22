/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'ambient-one': 'ambientPulse 22s ease-in-out infinite alternate',
        'ambient-two': 'ambientPulseSecondary 28s ease-in-out infinite alternate',
        'marquee-loop': 'marquee 35s linear infinite',
        'platform-reveal': 'platformReveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards',
        'glitch': 'glitchReveal 0.3s steps(2) infinite alternate',
        'curtain': 'slideUpOut 1.1s cubic-bezier(0.85, 0, 0.15, 1) forwards',
      },
    },
  },
  plugins: [],
}