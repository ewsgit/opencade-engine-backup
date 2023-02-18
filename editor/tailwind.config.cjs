/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                "fade-in": "fade-in 500ms ease-in-out forwards"
            },
            keyframes: {
                "fade-in": {
                    "0%": {
                        "opacity": 0
                    },
                    "100%": {
                        "opacity": 1
                    }
                }
            }
        },
    },
    plugins: [],
}
