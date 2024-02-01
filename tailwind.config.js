/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                red: '#FD6687',
                yellow: '#FFCE67',
                darkPurple: '#5C2DD5',
                purple: '#7945FF',
            },
            boxShadow: {
                container: '0px 10px 0px 0px #000',
            },
            padding: {
                2.5: '10px',
                7.5: '30px',
                8.5: '34px',
                12.5: '50px',
                15: '60px',
            },
            margin: {
                13: '50px',
                19: '76px',
            },
            gap: {
                7.5: '30px',
                12.5: '50px',
                15: '60px',
            },
            width: {
                35.5: '142px',
            },
            height: {
                18: '72px',
                50: '200px',
            },
            borderRadius: {
                '2.5xl': '20px',
            },
            fontSize: {
                'Heading-L': [
                    '56px',
                    {
                        lineHeight: '71px',
                        fontWeight: 700,
                    },
                ],
                'Heading-M': [
                    '24px',
                    {
                        lineHeight: '31px',
                        fontWeight: 700,
                    },
                ],
                'Heading-S': [
                    '20px',
                    {
                        lineHeight: '26px',
                        fontWeight: 700,
                    },
                ],
                'Heading-XS': [
                    '16px',
                    {
                        lineHeight: '21px',
                        fontWeight: 700,
                    },
                ],
                regular: [
                    '16px',
                    {
                        lineHeight: '20px',
                        fontWeight: 500,
                    },
                ],
                'Heading-variant': [
                    '32px',
                    {
                        lineHeight: '40px',
                        fontWeight: 700,
                    },
                ],
            },
        },
    },
    plugins: [],
}
