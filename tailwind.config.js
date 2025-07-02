/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // تفعيل dark mode بالـ class
  content: [
    "./src/**/*.{html,ts,css}", // مسارات جميع ملفات القوالب والستايل
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#ffffff",
          dark: "#1f2937",
        },
        text: {
          light: "#111827",
          dark: "#f9fafb",
        },
      },
    },
  },
  plugins: [],
};
