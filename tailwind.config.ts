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
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e', // Deep blue
                    950: '#082f49',
                },
                gold: {
                    50: '#fbf6ea',
                    100: '#f4e8c8',
                    200: '#eddaa9',
                    300: '#e6cd8a',
                    400: '#ddbe60',
                    500: '#d4af37', // Gold highlight
                    600: '#b8912a',
                    700: '#96751f',
                    800: '#785c18',
                    900: '#5a4512',
                    950: '#352809',
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
            },
            boxShadow: {
                // Kartların hover'da kazandığı yumuşak, markaya uygun derinlik
                'card': '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)',
                'card-hover': '0 18px 40px -12px rgb(12 74 110 / 0.22), 0 4px 10px -4px rgb(15 23 42 / 0.10)',
                'gold-glow': '0 0 0 1px rgb(212 175 55 / 0.35), 0 12px 32px -12px rgb(212 175 55 / 0.45)',
            },
            keyframes: {
                // Hero ve bölüm arkalarındaki yumuşak gradyan kütleleri
                blob: {
                    '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(28px, -38px) scale(1.08)' },
                    '66%': { transform: 'translate(-22px, 22px) scale(0.94)' },
                },
                'fade-up': {
                    '0%': { opacity: '0', transform: 'translateY(18px)' },
                    '100%': { opacity: '1', transform: 'none' },
                },
                'gold-sweep': {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' },
                },
            },
            animation: {
                blob: 'blob 18s ease-in-out infinite',
                'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
                'gold-sweep': 'gold-sweep 6s linear infinite',
            },
        },
    },
    plugins: [],
};
export default config;
