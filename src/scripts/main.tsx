import '../index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './utils/Auth'
import { ToastProvider, ToastRoot } from './utils/Toast'

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<BrowserRouter basename='banter'>
			<AuthProvider>
				<ToastProvider>
					<ToastRoot />
					{children}
				</ToastProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

ReactDOM.createRoot(document.getElementById('root') as Element).render(
	<Providers>
		<App />
	</Providers>,
)
