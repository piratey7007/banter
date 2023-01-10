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
				error: {
					100: '#FEE2E2',
					500: '#EF4444',
				},
				success: {
					100: '#D1FAE5',
					500: '#10B981',
				},
				pending: {
					100: '#FEE2E2',
					500: '#EF4444',
				},
			},
		},
	},
	plugins: [],
}
