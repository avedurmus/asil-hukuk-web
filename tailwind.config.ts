import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        // Blog ve SSS içerikleri data/ altında HTML dizesi olarak tutuluyor;
        // bu dosyalar taranmazsa içerikteki yardımcı sınıflar üretilmez.
        "./data/**/*.{js,ts}",
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
                // Derin lacivert — hukuk bürosuna yakışan ağırbaşlı ana renk
                primary: {
                    50: '#f3f6fa',
                    100: '#e4eaf3',
                    200: '#c7d4e6',
                    300: '#9db3d1',
                    400: '#7190bb',
                    500: '#4f6f9e',
                    600: '#3c5883',
                    700: '#30476b',
                    800: '#253857',
                    900: '#1a2942', // Deep navy
                    950: '#0f1a2c',
                },
                // Şampanya altını — parlak sarı yerine daha rafine, mat bir vurgu
                gold: {
                    50: '#fbf7ef',
                    100: '#f4ead6',
                    200: '#e8d4ae',
                    300: '#dbbd86',
                    400: '#cfaa68',
                    500: '#c09652', // Gold highlight
                    600: '#a67c3e',
                    700: '#866233',
                    800: '#6b4e2c',
                    900: '#584127',
                    950: '#2f2213',
                },
                // Sıcak fildişi zeminler
                ivory: {
                    50: '#fdfcf9',
                    100: '#f8f5ef',
                    200: '#f0ebe1',
                    300: '#e4dccd',
                },
                // In-between slate shades used across the site for finer
                // light/dark contrast steps than Tailwind's default scale.
                slate: {
                    150: '#eaeef4',
                    250: '#d6dee8',
                    350: '#b0bccc',
                    450: '#7c8ca2',
                    // Varsayılan #64748b açık zeminde (ivory) WCAG AA eşiğinin (4.5:1) altında kalıyordu.
                    500: '#5b6a80',
                    550: '#56647a',
                    650: '#3d4b5f',
                    750: '#283548',
                    850: '#162032',
                }
            },
            boxShadow: {
                // Kartların hover'da kazandığı yumuşak, markaya uygun derinlik
                'card': '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)',
                'card-hover': '0 18px 40px -12px rgb(26 41 66 / 0.22), 0 4px 10px -4px rgb(15 23 42 / 0.10)',
                'gold-glow': '0 0 0 1px rgb(192 150 82 / 0.35), 0 12px 32px -12px rgb(192 150 82 / 0.45)',
                'elegant': '0 30px 60px -20px rgb(15 26 44 / 0.25), 0 12px 24px -12px rgb(15 26 44 / 0.12)',
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
                'soft-pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgb(34 197 94 / 0.45)' },
                    '70%': { boxShadow: '0 0 0 14px rgb(34 197 94 / 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgb(34 197 94 / 0)' },
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
                'soft-pulse': 'soft-pulse 2.4s ease-out infinite',
            },
        },
    },
    plugins: [],
};
export default config;
