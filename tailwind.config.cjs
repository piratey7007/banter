/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#212F45',
				'primary-light': '#2F4268',
				secondary: '#24394A',
				white: '#F0F0F0',
				black: '#0F1215',
				error: {},
				success: {},
			},
		},
	},
	plugins: [],
}
