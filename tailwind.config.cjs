/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,mdx}", "./components/**/*.{js,jsx,mdx}", "./lib/**/*.{js,jsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 18px 40px -28px rgba(15, 23, 42, 0.45)"
      }
    }
  },
  plugins: []
};
