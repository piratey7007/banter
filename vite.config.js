import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tailwindNesting from '@tailwindcss/nesting'

export default defineConfig({
	plugins: [react()],
	css: {
		postcss: {
			plugins: [tailwindNesting, tailwind, autoprefixer],
		},
	},
	base: '/banter',
	optimizeDeps: {
		exclude: [
			'firebase',
			'@firebase/app',
			'@firebase/auth',
			'@firebase/firestore',
			'@firebase/analytics',
			'firebase/app',
			'firebase/auth',
			'firebase/firestore',
		],
	},
})
