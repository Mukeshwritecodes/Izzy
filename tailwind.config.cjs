/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "320px",
        md: "768px",
        lg: "1024px",
      },
      fontFamily: {
        lora: ["Lora", "serif"], // Add 'Lora' to the font family
        // You can add more custom fonts here
        // 'sans': ['Inter', 'sans-serif'], // Example of overriding the default sans
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
