const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                'fade-in': 'fade-in var(--tw-animation-duration) ease-in-out forwards',
            },
            keyframes: {
                'fade-in': {
                    '0%': {
                        opacity: 0,
                    },
                    '100%': {
                        opacity: 1,
                    },
                },
            },
        },
    },
    plugins: [
        plugin(function ({addUtilities, theme}) {
            const animationDurations = theme('animationDuration', {
                100: "100",
                250: "250",
                500: "500",
                750: "750",
                1000: "1000",
                2000: "2000",
            });
            const utilities = {};

            Object.entries(animationDurations).forEach(([name, duration]) => {
                const className = `.animation-duration-${name}`;

                utilities[className] = {
                    '--tw-animation-duration': `${duration}ms`,
                };
            });

            addUtilities(utilities);
        }),
    ],
};
