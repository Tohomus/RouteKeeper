/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#EFF6FF",
          DEFAULT: "#3B82F6",
          dark: "#2563EB",
        },
      },
      backgroundImage: {
        "login-gradient":
          "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
      },
    },
  },
  plugins: [],
};
