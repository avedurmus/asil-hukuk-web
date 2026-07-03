import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                serif: ['var(--font-playfair)', 'serif'],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    900: '#0c4a6e', // Deep blue
                },
                gold: {
                    50: '#fbf6ea',
                    100: '#f4e8c8',
                    300: '#e6cd8a',
                    500: '#d4af37', // Gold highlight
                    600: '#b8912a',
                    700: '#96751f',
                },
                // In-between slate shades used across the site for finer
                // light/dark contrast steps than Tailwind's default scale.
                slate: {
                    150: '#eaeef4',
                    250: '#d6dee8',
                    350: '#b0bccc',
                    450: '#7c8ca2',
                    550: '#56647a',
                    650: '#3d4b5f',
                    750: '#283548',
                    850: '#162032',
                }
            }
        },
    },
    plugins: [],
};
export default config;
