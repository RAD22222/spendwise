/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                app: 'var(--bg-app)',
                card: 'var(--bg-card)',
                main: 'var(--text-main)',
                sub: 'var(--text-sub)',
                border: 'var(--border-color)',
                accent: 'var(--accent)',
                'accent-light': 'var(--accent-light)',
                highlight: 'var(--bg-highlight)',
                brown: 'var(--accent-brown)',
            }
        },
    },
    plugins: [],
}
