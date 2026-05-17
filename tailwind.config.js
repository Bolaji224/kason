import withMT from "@material-tailwind/html/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        slideUp: 'slideUp 0.4s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      fontFamily: {
        'sans': ['Noto Sans', 'sans-serif'],
        'neuton': ['Neuton', 'sans-serif'],
        'poppins': ["Poppins", "sans-serif"],
        'fairs': ["Playfair Display", 'serif'],
        'merri': ["Merriweather", 'serif']
      },
    },
  },
  darkMode: false,
  plugins: [],
});
